import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, Picker, ScrollView } from 'react-native';

import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment'

import CalendarPicker from 'react-native-calendar-picker'

import { changeAvailability } from '../../../redux/actions/UserActions';

import CustomButton from '../../../components/ui/CustomButton';
import Header from '../../../components/Header';
import TimeList from '../../../components/TimeList';

import style from './style';

class Availability extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      dayInTheWeek: 0,
      availability: this.props.currentUser.availability,
      duration: this.props.currentUser.status.duration,
      timeList: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  getTimeArray = (selectedDate, duration) => {
    const date = new Date(selectedDate);

    date.setHours(8, 0, 0, 0);

    let timeArr = [];
    for (let index = 0; date.getHours() < 17; index++) {
      const timeButton = {
        time: {
          hours: date.getHours(),
          minutes: date.getMinutes(),
        },
        free: false,
      };

      timeArr.push(timeButton);
      date.setMinutes(date.getMinutes() + duration);
    }

    return timeArr;
  }

  onDateChange = (day, type) => {
    const dayParse = day.format('YYYY-MM-DD');
    const timeList = this.getTimeArray(dayParse, this.state.duration);
    
    //console.log('selected day', dayParse);

    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: dayParse,
        timeList: timeList,
      });
    } else {
      this.setState({
        selectedStartDate: dayParse,
        selectedEndDate: null,
        dayInTheWeek: 0,
      });
    }
  }

  onWeekChange = (dayInTheWeek) => {
    const dayParse = moment().format('YYYY-MM-DD');
    const timeList = this.getTimeArray(dayParse, this.state.duration);

    this.setState({
      dayInTheWeek: dayInTheWeek, 
      selectedStartDate: null,
      selectedEndDate: null,
      timeList: timeList
    });
  }

  changeFree = (index, value) => {
    let timeList = this.state.timeList;
    timeList[index].free = value;
    this.setState({timeList});
  }

  setAvailability = (dateStart, dateEnd, timeList, dayInTheWeek) => {
    const selectedTime = timeList.filter(item => item.free === true);

    let availability = {
      days:[],
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    };
  
    if (selectedTime.length > 0) {
      if (this.state.availability) {
        availability = this.state.availability;
      }
  
      if (dayInTheWeek === 0) {
        for (let day = moment(dateStart); !day.isAfter(dateEnd); day.add(1,'days')) { 
          
            const dayTime = {
              day: day.format('YYYY-MM-DD'),
              freeTime: [],
            }
    
            selectedTime.forEach((item) => {
              dayTime.freeTime.push(item.time);
            });
    
            availability.days.push(dayTime);
          } 
        } else {
          availability[dayInTheWeek] = [];
          selectedTime.forEach((item) => {
            availability[dayInTheWeek].push(item.time);
          });
        }
     
      this.setState({availability});
      this.props.changeAvailability(availability);
      firebase.update(`users/${this.props.currentUser.uid}`, { availability: availability });

    } else {
      alert('You did not choose free time!');
    }
  }

  render () {
    const minDateCalendar = moment().format('YYYY-MM-DD');

    let disabledDates = [];
    if (this.state.availability && this.state.availability.days && this.state.availability.days.length > 0) {
      disabledDates = this.state.availability.days.map((item) => {
        return item.day;
      })
    }
    
    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'My Availability'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView>
          <View style = { style.formWrapp }>
            <View style = { style.label }>
              <Text>
                Date Range
              </Text>
            </View>
            <View style = { style.form }>
              <CalendarPicker
                allowRangeSelection = {true}
                minDate = { minDateCalendar }
                selectedStartDate = { this.state.selectedStartDate }
                selectedEndDate = { this.state.selectedEndDate }
                todayBackgroundColor = '#ffffff'
                todayTextStyle = {{color: '#4baad0'}}
                selectedDayColor = '#4baad0'
                selectedDayTextColor = '#FFFFFF'
                width = { 220 }
                previousTitle = '<'
                nextTitle = '>'
                onDateChange={ this.onDateChange }
                disabledDates = { disabledDates }
              />
            </View>
          </View>

          <View style = { style.formWrapp }>
            <View style = { style.label }>
              <Text>
                Day in the Week
              </Text>
            </View>
            <View style = { style.form }>
              <View style = {style.selectDay}>
                <Picker 
                  selectedValue = { this.state.dayInTheWeek }
                  onValueChange = {
                    (itemValue, itemIndex) => {
                      this.onWeekChange(itemValue);
                    }
                  }
                  style = {{ color: '#555', height: 30, }}>
                  <Picker.Item label={ 'Day in the Week' } value={ 0 } key={ 0 }/>
                  <Picker.Item label={ 'Sunday' } value={ 'sunday' } key={ 1 }/>
                  <Picker.Item label={ 'Monday' } value={ 'monday' } key={ 2 }/>
                  <Picker.Item label={ 'Tuesday' } value={ 'tuesday' } key={ 3 }/>
                  <Picker.Item label={ 'Wednesday' } value={ 'wednesday' } key={ 4 }/>
                  <Picker.Item label={ 'Thursday' } value={ 'thursday' } key={ 5 }/>
                  <Picker.Item label={ 'Friday' } value={ 'friday' } key={ 6 }/>
                  <Picker.Item label={ 'Saturday' } value={ 'saturday' } key={ 7 }/>
                </Picker>
              </View>
            </View>
          </View>

          <TimeList 
            timeList = {this.state.timeList}
            type = 'AVAILABILITY'
            changeFree = {this.changeFree}
            />

          <View style={{flex:1, justifyContent: 'center'}}>
            <CustomButton
              style={{flex: 1, 
                padding: 10, 
                borderWidth: 1, 
                borderColor: '#4baad0', 
                marginTop: 15}}
              textStyle = { {color: '#4baad0',
                fontWeight: 'bold',
                textAlign: 'center'} }
              text = 'Add Availability'
              onPress = { () => { 
                this.setAvailability(this.state.selectedStartDate, this.state.selectedEndDate, this.state.timeList, this.state.dayInTheWeek)
              }}
            />
          </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAvailability: bindActionCreators(changeAvailability, dispatch),
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]), 
  connect(mapStateToProps, {
    changeAvailability,
}))(Availability);
