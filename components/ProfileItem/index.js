import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import style from './style';

export default class ProfileItem extends Component {
  render () {
    const name =
      this.props.withName
      ? ( <Text style = { style.userItemName }>{ `${ this.props.profile.firstName } ${ this.props.profile.lastName.charAt(0).toUpperCase() }.` }</Text> )
      : null;

    return (
      <TouchableOpacity style = {[ style.userItem, this.props.style ]} onPress = { () => { this.props.onPress() } }>
        <View style = { style.userItemImageWrapper } >
          <Image
            source = { require('../../assets/images/avatar-ph.png') }
            style = { style.userItemImage } />
        </View>
        <View style = { style.userItemInfo }>
          { name }
          <Text style = { style.userItemDesc }>
            { this.props.profile.info.summary }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
