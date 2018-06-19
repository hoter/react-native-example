import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';

import CustomButton from '../ui/CustomButton';

import { setQuestionParam } from '../../redux/actions/QuestionAction';

import style from './style';

export default class TimeList extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      timeList: this.props.timeList,   
    }
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  onPressTimeButton = (currentTime, index) => {
    if (this.props.type === 'AVAILABILITY') {
      if (!currentTime.free) {
        this.props.changeFree(index, true);
      } else {
        this.props.changeFree(index, false);
      }
    }

    if (this.props.type === 'BOOK') {
      this.props.changeBook(currentTime, index);
    }
  }
  
  render () {

    //console.log('this.state.counter', this.state.counter)
    const time = this.props.timeList;

    const timeList = time.map(
      (value, i) => {
        return <CustomButton
          key = { i }
          style = { [ style.timeButton, !value.free ? style.timeButtonFree : null, value.book ? style.timeButtonBook : null, value.meeting ? style.timeButtonBook : null ] }
          textStyle = { [style.timeButtonText, value.book ? {color: '#ffffff'} : null, value.meeting ? {color: '#ffffff'} : null] }
          disabled = { true }
          text = { value.time.hours + ':' + (value.time.minutes == 0 ? (value.time.minutes + '0') : (value.time.minutes)) }
          onPress = { () => {
            this.onPressTimeButton(value, i);
          }}
        />
      }
    );

    const timeListFirst = timeList.slice(0, Math.ceil(timeList.length/2))
    const timeListSecond = timeList.slice(Math.ceil(timeList.length/2))
    
    return (
      <View style = {{flex: 1, justifyContent: 'space-around', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start'}}>
        <View>
          { timeListFirst }
        </View>
        <View>
          { timeListSecond }
        </View>
      </View>
    );
  }
}


