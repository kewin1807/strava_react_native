import React from 'react';
import {View, Text} from 'react-native';
import {wrap} from '../../../themes';

@wrap
export default class TabRecord extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View cls="flx-i aic jcc">
        <Text>Record</Text>
      </View>
    );
  }
}
