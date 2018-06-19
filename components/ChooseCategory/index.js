import React from 'react';
import { View, Image, Text, Picker } from 'react-native';

import { setQuestionParam } from '../../redux/actions/QuestionAction';

import style from './style';

export default class ChooseCategory extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      chooseCategory: "Choose a Category",
    }
  }

  render () {

    const categoriesArr = ["Bad management","Bad work environment","New job challenges","Career transition","Difficult co-workers","Get a raise/promotion","Leaving my company"];

    const categories = categoriesArr.map(
      (value, i) => (
        <Picker.Item label={ value } value={ value } key={ i+1 }/>
      )
    );

    return (
      <View style = { style.chooseCategory }>
        <Picker
          selectedValue = { this.state.chooseCategory }
          onValueChange={
            (itemValue, itemIndex) => {
              this.setState({chooseCategory: itemValue});
              this.props.valueChange(itemValue);
            }
          }
          style = {{ color: '#555', height: 30, }}>
          <Picker.Item label={ "Choose a Category" } value={ null } key={ 0 }/>
          { categories }
        </Picker>
      </View>
    );
  }
}
