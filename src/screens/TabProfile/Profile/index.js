import React, {useState} from 'react';
import {wrap, options} from '../../../../themes';

import {View, Image, Text, TouchableOpacity} from 'react-native';
import Loading from '../../../components/Loading';
import images from '../../../../assets';

const ProfileScreen = wrap(() => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [follower_count, setFollowerCount] = useState(0);
  const [following_count, setFollowingCount] = useState(0);
  const [avatar, setAvatar] = useState('');
  const getProfileSuccess = res => {
    if (res && res.data) {
      setFirstName(res.data.firstname);
      setLastName(res.data.lastname);
      if (res.data.follower_count) {
        setFollowerCount(res.data.follower_count);
      }
      if (res.data.following_count) {
        setFollowingCount(res.data.following_count);
      }

      setAvatar(res.data.profile);
    }
  };
  const getProfileError = error => {
    console.log(error);
  };
  const checkVaildAvatar = link => {
    if (link !== '' && link.indexOf('http') !== -1) {
      return true;
    }
    return false;
  };
  return (
    <View cls="flx-i">
      <View cls="flx-row pa2 ph3">
        <View cls="flx-i">
          <Image
            cls="circleFn-90"
            source={checkVaildAvatar(avatar) ? {uri: avatar} : images.avatar}
          />
        </View>
        <View cls="flexFn-3 aifs pv2 ph1">
          <Text cls="f6 fw5">{`${firstname} ${lastname}`}</Text>
        </View>
      </View>
      <View cls="flx-row">
        <View cls="ph3">
          <Text cls="primary f7 fw6">{`${following_count}`}</Text>
          <Text cls="gray f7">{'Following'}</Text>
        </View>

        <View cls="ph3">
          <Text cls="primary f7 fw6">{`${follower_count}`}</Text>
          <Text cls="gray f7">{'Follower'}</Text>
        </View>

        <View cls="flx-i aife ph3">
          <TouchableOpacity cls="br2 pa2 jcc aic b--primary ba">
            <Text cls="primary f6">{'Find Friend'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading
        url="/athlete"
        timeWait={0}
        onSuccess={getProfileSuccess}
        onError={getProfileError}
        indicatorColor={options.colors.white}
        autoLoading={true}
        useAccessToken={true}
        containerCls="fullViewLoading zIndexFn-1"
      />
    </View>
  );
});

export default ProfileScreen;
