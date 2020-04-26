import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import WebView from 'react-native-webview';
import {wrap, options} from '../../../themes';
import constants from '../../constants';
import ImageIcon from '../../elements/Image';
import {Navigation} from 'react-native-navigation';
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import {getCodeAuth, getAccessToken} from '../../store/selector/auth';
import {tabRecord, startTabScreen} from '../../../index';
import * as authActions from '../../store/actions/auth';

@connect(
  state => ({code: getCodeAuth(state), token: getAccessToken(state)}),
  {...authActions},
  (stateProps, dispatchProps, ownProps) => ({
    initialValues: {
      enableReinitialize: true,
    },
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  }),
)
@wrap
export default class Login extends React.Component {
  constructor() {
    super();
    this.loading = React.createRef();
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
    this.getToken();
  }

  getToken = () => {
    const {code} = this.props;
    if (this.loading && this.loading.current) {
      this.loading.current.fetchData({
        method: 'post',
        data: {
          client_id: constants.CLIENT_ID,
          client_secret: constants.CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
        },
      });
    }
  };

  onSuccessToken = response => {
    this.setState({visible: true});
    const {login} = this.props;
    login(response.data);
  };
  onErrorToken = error => {
    this.setState({visible: false});
    Alert.alert('Thông báo', error && error.message ? error.message : 'Error');
  };

  loginStrava = () => {
    startTabScreen();
  };

  render() {
    return (
      <View cls="flx-i">
        <View cls="flx-i aic jcc pv4">
          <ImageIcon name="login" />
        </View>
        <View cls="flx-i aic jcc">
          <Text cls="fw5 f5">Welcome to Strava App</Text>
          <Text>Have a great experience with Strava</Text>
        </View>
        {this.state.visible ? (
          <View cls="flx-i pa3 jcfe">
            <TouchableOpacity
              cls="bg-#f55a42 br2 jcc aic pa3"
              onPress={this.loginStrava}>
              <Text cls="white">Continue go home</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Loading
          ref={this.loading}
          url="/oauth/token"
          timeWait={0}
          onSuccess={this.onSuccessToken}
          onError={this.onErrorToken}
          autoLoading={false}
          indicatorColor={options.colors.white}
          autoLoading={false}
          useAccessToken={false}
          containerCls="fullViewLoading zIndexFn-1"
        />
      </View>
    );
  }
}
