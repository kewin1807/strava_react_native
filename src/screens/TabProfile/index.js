import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {wrap} from '../../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './Profile';
@wrap
export default class TabProfile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View cls="flx-i">
        <View>
          <View cls="flx-row">
            <View cls="flx-i pa3">
              <Text cls="primary f5">Edit</Text>
            </View>

            <View cls="flx-i pa3 jcc aic">
              <Text cls="f5">Profile</Text>
            </View>

            <View cls="flx-i pa3 aife">
              <Icon name="cogs" size={30} color="rgb(255,68,30)" />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
            }}
          />

          <ScrollView>
            <ProfileScreen />
          </ScrollView>
        </View>
      </View>
    );
  }
}
