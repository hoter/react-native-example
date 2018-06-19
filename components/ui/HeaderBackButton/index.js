import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../CustomButton';

import styles from './style';

export default class HeaderBackButton extends React.Component {
  render () {
    return (
      <CustomButton
        text = '<'
        textStyle = { styles.icon }
        style = { styles.headerBackButton }
        onPress = {
          () => {
            if (this.props.pop) this.props.navigation.pop(this.props.pop);
            else this.props.navigation.goBack()
          }
        }
      />
    );
  }
}