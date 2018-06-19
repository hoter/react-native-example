import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../ui/CustomButton';

import style from './style';

export default class Keywords extends React.Component {
  render () {
    const keywords = this.props.keywords && this.props.keywords.map(
      (value) => !this.props.isClickable
        ? <Text key = { value } style = { style.keywordText }> { value } </Text>
        : <CustomButton
            key = { value }
            style = { style.cKeyword }
            textStyle = { style.cKeywordText }
            text = { value }
            onPress = { () => { this.props.onKeywordPress(value) }}
          />
    );

    return (
      <View style = { style.keywords }>
        { keywords }
      </View>
    );
  }
}
