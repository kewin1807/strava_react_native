import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import images from '../../../assets';

type Props = {
  name: string,
};
export default class ImageIcon extends PureComponent<Props> {
  render() {
    const {name} = this.props;
    return <Image source={images[`${name}`]} {...this.props} />;
  }
}
