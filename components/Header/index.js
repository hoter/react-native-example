import React from 'react';
import { View, Text } from 'react-native';
import HeaderBackButton from '../ui/HeaderBackButton';

import style from './style';

export default class Header extends React.Component {
  render () {
    const backBtn = (this.props.isModalScreen) ? (
      <HeaderBackButton
        navigation = { this.props.navigation }
        pop = { this.props.pop ? this.props.pop : null  } />
    ) : null;

    const buttons = this.props.buttons ? this.props.buttons : null;

    return (
      <View style = {[ style.header, style.vCenter ]}>
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          { backBtn }
        </View>
        <View style = {{ flex: 2, justifyContent: 'center' }}>
          <Text style = { style.title }>
            { this.props.title }
          </Text>
        </View>
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          { buttons }
        </View>
      </View>
    );
  }
}
