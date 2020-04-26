import React, {Component} from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';
import constants from '../../../constants';
import {wrap, options} from '../../../../themes';
import Loading from '../../../components/Loading';
import {startLoginScreen} from '../../../../index';
import {connect} from 'react-redux';

import * as authActions from '../../../store/actions/auth';
const CALL_BACK_URL_SHEME = `${constants.URL_SHEME_PREFIX}://${constants.URL_SHEME_HOST}`;
const INITIAL_URI = `https://www.strava.com/oauth/authorize?client_id=${constants.CLIENT_ID}&response_type=code&redirect_uri=${CALL_BACK_URL_SHEME}&scope=activity:write,read`;

@connect(
  state => ({}),
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
export default class WebViewLogin extends Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
    this.state = {
      visible: true,
    };
  }
  onNavigationStateChange = url => {
    const {getCode} = this.props;
    if (url.startsWith(CALL_BACK_URL_SHEME)) {
      const arr = url.split('&');
      let code = arr[1];
      code = code.slice(5, code.length);
      getCode(code);
      // startLoginScreen && startLoginScreen(code);
    }
  };

  render() {
    return (
      <View cls="flx-i">
        {this.state.visible ? (
          <WebView
            style={{flex: 1}}
            ref={ref => {
              this.webView = ref;
            }}
            source={{uri: INITIAL_URI}}
            onNavigationStateChange={event =>
              this.onNavigationStateChange(event.url)
            }
          />
        ) : null}
      </View>
    );
  }
}
