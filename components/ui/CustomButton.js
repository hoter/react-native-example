import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

export default class CustomButton extends React.Component {
  render () {
    const text = this.props.text ? <Text style={ this.props.textStyle }>{ this.props.text }</Text> : null;
    const image = this.props.imageSource ? <Image style={ this.props.imageStyle } source = { this.props.imageSource } /> : null;

    return (
      <TouchableOpacity onPress={ () => this.props.onPress() } style={ this.props.style }>
        { image }
        { text }
      </TouchableOpacity>
    )
  }
};
