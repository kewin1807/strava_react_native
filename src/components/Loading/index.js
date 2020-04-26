import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {wrap, options} from '../../../themes';
import constants from '../../constants';
import axios from 'axios';
@wrap
export default class Loading extends React.Component {
  static defaultProps = {
    autoLoading: true,
    timeWait: 1000,
    timeOut: 80000,
    onSuccess: () => {},
    onError: () => {},
    size: 'small',
    visible: true,
    useAccessToken: true,
    gateWay: 1,
  };
  constructor(props) {
    super(props);
    this.state = {
      isIndicatorVisible: false,
    };
    this.timeWaitFn = null;
    this.mounted = false;

    //variable to check fresh token
    this.recursiveOnce = false;

    this.params = {};
    this.accessToken = '';
  }
  componentDidMount = () => {
    const {autoLoading} = this.props;
    this.mounted = true;
    if (autoLoading) {
      this._handleFetchData();
    }
  };

  componentWillUnmount = () => {
    this.mounted = false;
    this._clearTimeOut();
  };

  _handleFetchData = () => {
    const {params} = this.props;
    this.fetchData(params);
  };

  // custom header config and data API
  _prepareRequestContent = (params, refresh) => {
    const {useAccessToken} = this.props;

    // loading with data
    if (!refresh && !this.recursiveOnce) {
      this.params = params;
      this._setTimeWait();
    }
    console.log(
      `${constants[`GATEWAY${this.props.gateWay}`]}${this.props.url}`,
    );

    const mainRequest = {
      ...params,
      url: `${constants[`GATEWAY${this.props.gateWay}`]}${this.props.url}`,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...params.headers,
      },
    };

    // Use dynamic accessToken for refreshing token later
    // Because store dispatch save accessToken is async function
    // const accessToken =
    //   store &&
    //   store.getState &&
    //   typeof store.getState === 'function' &&
    //   store.getState().auth.accessToken;

    // if (!refresh) {
    //   this.accessToken = accessToken;
    // }
    // if (accessToken && useAccessToken && !refresh) {
    //   mainRequest.headers.Authorization = `Bearer ${this.accessToken}`;
    // }
    return mainRequest;
  };
  //fetch data
  fetchData = (params, refresh = false) => {
    const {onSuccess, onError, timeOut, url, publicAPI} = this.props;
    const requestContent = this._prepareRequestContent(params, refresh);
    axios(requestContent)
      .then(async response => {
        const {status} = response;
        if (status >= 200 && status < 300) {
          return response;
        }
        let errorText = '';
        switch (status) {
          case 404:
            errorText = 'Server not found';
          default:
            const currentRes = response;
            if (currentRes && currentRes.statusText) {
              errorText = currentRes.statusText;
            }
            break;
        }
        return Promise.reject({message: errorText, status});
      })
      .then(responseJson => {
        if (!responseJson.status) {
          return this.handleError(responseJson);
        }
        return this.handleSucess(responseJson);
      })
      .catch(error => {
        let currentError = error;
        if (currentError instanceof TypeError) {
          currentError = {
            status: 500,
          };
        }
        this.handleError(error);
      });
  };

  //handle data with response
  handleSucess = response => {
    this.setState({isIndicatorVisible: false});
    const {onSuccess} = this.props;
    onSuccess && onSuccess(response);
  };
  handleError = error => {
    this.setState({isIndicatorVisible: false});
    const {onError} = this.props;
    onError && onError(error);
  };

  _setTimeWait = () => {
    const {timeWait} = this.props;
    if (timeWait === 0) {
      return this.setState({
        isIndicatorVisible: true,
      });
    }
    if (timeWait) {
      this.timeWaitFn = setTimeout(() => {
        this.setState({
          isIndicatorVisible: true,
        });
      }, timeWait);
    }
  };

  _clearTimeOut = () => {
    if (this.timeWaitFn) {
      clearTimeout(this.timeWaitFn);
    }
  };

  render() {
    const {isIndicatorVisible, size} = this.state;
    const {
      containerStyle,
      emptyMessage,
      children,
      indicatorColor,
      visible,
    } = this.props;

    if (!visible) {
      return <View />;
    }
    if (!isIndicatorVisible) {
      if (emptyMessage || children) {
        return (
          <View style={[containerStyle]}>
            {emptyMessage ? <Text>{emptyMessage}</Text> : null}
            {children || null}
          </View>
        );
      }
      return null;
    }
    return (
      <View style={[containerStyle]}>
        <ActivityIndicator
          color={indicatorColor || options.colors.dark}
          size={size}
        />
      </View>
    );
  }
}
