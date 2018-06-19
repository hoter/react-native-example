import React from 'react';
import { View, Image, Text } from 'react-native';

import style from './style';

export default class AdvisorPreview extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const advisors = this.props.advisors;
    const preview = advisors.length > 0
      ? advisors.map(
        (value) => (
          <View style = { style.preview } key = { value.key }>
            <Image source = { require('../../assets/images/avatar-ph.png') } style = { style.avatar } />
            <Text style = { style.name } >
              { `${ value.data.firstName } ${ value.data.lastName.charAt(0).toUpperCase() }.` }
            </Text>
          </View>
        )
      )
      : null;

    return (
      <View style = { style.wrapper }>
        { preview }
      </View>
    );
  }
}
