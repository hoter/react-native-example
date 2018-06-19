import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import style from './style';

class SettingsMenuItem extends React.Component {
  render () {
    const menuItemIcon = ( this.props.logo ) ? (
      <Image source = { this.props.logo } style={ style.menuItemLogo }/>
    ) : null;

    const menuItemValue = ( this.props.value ) ? (
      <Text style = { style.menuItemValue }>
      { this.props.value }
      </Text>
    ) : null;

    return (
      <TouchableOpacity
        style = { style.menuItem }
        onPress = { () => {
          // console.log(this.props.navigation)
          // console.log(`go to ${this.props.url}`)
          this.props.navigation.navigate(this.props.url)
        }}
      >
        <View style = { style.menuItemWrapText }>
          <Text style = { style.menuItemText }>
            { this.props.label }
          </Text>
          { menuItemIcon }
        </View>

        <View style = { style.menuItemWrapText }>
          { menuItemValue }
          <Text  style = { style.menuItemIcon }>
            { `>` }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(SettingsMenuItem);
