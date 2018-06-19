import React from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';

export default class UserId extends React.Component {
  render () {
    return (
      <View style = { style.userId }>
        <Image style = { style.userIdImage } source = { require('../../assets/images/icons/user-id.png') } />
        <Text style = { style.userIdLabel }>User { this.props.id }</Text>
      </View>
    );
  }
}
