import React from 'react';
import {View, Text} from 'react-native';
import {wrap} from '../../../themes';

@wrap
export default class TabProfile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View cls="flx-i aic jcc">
        <Text>Profile</Text>
      </View>
    );
  }
}
