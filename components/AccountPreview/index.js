import React from 'react';
import { View, Image, Text } from 'react-native';

import style from './style';

export default class AccountPreview extends React.Component {
  render () {
    return (
      <View style = { style.wrapper }>
        <View style = { style.preview } key = { this.props.account.uid }>
            <Image source = { require('../../assets/images/avatar-ph.png') } style = { style.avatar } />
            <Text style = { style.name } >
              { `Name: ${this.props.account.firstName} ${this.props.account.lastName && this.props.account.lastName.charAt(0).toUpperCase() + '.'}` }
            </Text>
          </View>
      </View>
    );
  }
}
