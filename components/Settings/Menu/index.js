import React from 'react';
import { View, ScrollView } from 'react-native';
import SettingsMenuItem from '../MenuItem';

import style from './style';

export default class SettingsMenu extends React.Component {
  render () {
    const menuItems = this.props.menuItems.map(
      (value) => (
        <SettingsMenuItem
          key = { value.url }
          label = { value.label }
          url = { value.url }
          value = { value.value }
          logo = { value.logo }
        />
      )
    );

    return (
      <ScrollView>
        { menuItems }
      </ScrollView>
    );
  }
}

