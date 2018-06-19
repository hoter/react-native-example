import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TouchableOpacity, Text, Image, DeviceEventEmitter, Picker, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker'

import moment from 'moment'
import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import { changeBook } from '../../redux/actions/UserActions';

import SettingsMenu from '../../components/Settings/Menu';
import Header from '../../components/Header';
import CustomButton from '../../components/ui/CustomButton';
import TimeList from '../../components/TimeList';

import style from './style';

class Book extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      meetingId: null,
      selectedAdvisor: this.props.navigation.state.params.selectedAdvisor,
      selectedDate: null,
      dayInTheWeek: 0,
      availability: this.props.navigation.state.params.selectedAdvisor.data.availability,
      duration: this.props.navigation.state.params.selectedAdvisor.data.status.duration,
      timeList: [],
      bookSelectedAdvisor: this.props.navigation.state.params.selectedAdvisor.data.book || {},
      bookCurrentUser: this.props.currentUser.book || {},
      indexBook: null,
      book: this.props.currentUser.book,
      numberOfConversation: 1,
      timeZone: this.props.navigation.state.params.selectedAdvisor.data.info.timeZone || '(GMT +0)',
      typeCall: this.props.navigation.state.params.typeCall,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  scheduleMeeting() {

    var today = new Date();
    today.setHours(today.getHours() + 1);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    console.log(today.toISOString());

    fetch('https://api.zoom.us/v2/users/eZ3aySafSlOyJqHPPThppQ/meetings/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkNGlNOWp4bVJPNkJTaFVVVXdOT09BIiwiZXhwIjoxNDk2MDkxOTY0MDAwfQ.oEKRwXs1VsmdTjmIog7xZqmyBOn89g1Hj23-HceEFiE',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "type": 2,
        "start_time": today,
        "duration": 30,
      }),
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then((response) => {
        console.log('Success:', response);
        this.setState({meetingId: response.id});
        console.log(this.state.meetingId);
    });
  }

  getTimeArray = (selectedDate, duration, dayInTheWeek = null) => {
    const date = new Date(selectedDate);
    date.setHours(8, 0, 0, 0);

    dayWeekSelectedDate = moment(selectedDate).format('dddd').toLowerCase();

    let timeArr = [];

    if (dayInTheWeek) {
      const availabilityWeek = this.state.availability[dayInTheWeek];

      let bookWeek = [];
      if (this.state.bookSelectedAdvisor[dayInTheWeek]) {
        bookWeek = this.state.bookSelectedAdvisor[dayInTheWeek].filter(item => item.days.some(item => { return item === selectedDate }));
      }

      let bookDay = [];
      if (this.state.bookSelectedAdvisor.days) {
        bookDay = this.state.bookSelectedAdvisor.days.filter(item => item.day === selectedDate);
        bookWeek = bookWeek.concat(bookDay);
      }

      for (let i = 0; i < availabilityWeek.length; i++) {
        const timeButton = {
          time: {
            hours: availabilityWeek[i].hours,
            minutes: availabilityWeek[i].minutes,
          },
          free: true,
          book: false,
          meeting: false,
        };

        if (bookWeek && bookWeek.length > 0) {
          for (let j = 0; j < bookWeek.length; j++) {
            if (availabilityWeek[i].hours === bookWeek[j].bookTime.hours && availabilityWeek[i].minutes === bookWeek[j].bookTime.minutes) {
              timeButton.meeting = true;
            }
          }
        }

        timeArr.push(timeButton);
      }

      return timeArr;
    }

    let availabilityDay = null;
    if (this.state.availability && this.state.availability.days) {
      availabilityDay = this.state.availability.days.filter(item => item.day === selectedDate);
    }

    let bookDay = [];
    if (this.state.bookSelectedAdvisor.days) {
      bookDay = this.state.bookSelectedAdvisor.days.filter(item => item.day === selectedDate);
    }

    if (this.state.bookSelectedAdvisor[dayWeekSelectedDate]) {
      const bookDaySecond = this.state.bookSelectedAdvisor[dayWeekSelectedDate].filter(item => item.days.some(elem => { return elem === selectedDate }));
      bookDay = bookDay.concat(bookDaySecond);
    }

    if (availabilityDay && availabilityDay.length) {

      for (let i = 0; i < availabilityDay[0].freeTime.length; i++) {
        const timeButton = {
          time: {
            hours: availabilityDay[0].freeTime[i].hours,
            minutes: availabilityDay[0].freeTime[i].minutes,
          },
          free: true,
          book: false,
          meeting: false,
        };

        if (bookDay && bookDay.length > 0) {
          for (let j = 0; j < bookDay.length; j++) {
            if (availabilityDay[0].freeTime[i].hours === bookDay[j].bookTime.hours && availabilityDay[0].freeTime[i].minutes === bookDay[j].bookTime.minutes) {
              timeButton.meeting = true;
            }
          }
        }

        timeArr.push(timeButton);
      }
    }

    return timeArr;

  }

  onDateChange = (day, type) => {
    const dayParse = day.format('YYYY-MM-DD');
    const timeList = this.getTimeArray(dayParse, this.state.duration);

    this.setState({
      selectedDate: dayParse,
      timeList: timeList,
      dayInTheWeek: 0,
    });
  }

  changeBook = (currentTime, index) => {
    let timeList = this.state.timeList;

    if (timeList[index].meeting !== true) {
      timeList[index].book = !timeList[index].book;
      if(this.state.indexBook === null) {
        this.setState({timeList, indexBook: index});
      } else {
        timeList[this.state.indexBook].book = false;
        this.setState({timeList, indexBook: index});
      }
    }

    /*const book = {
      day: this.state.selectedDate,
      time: currentTime.time,
      meetingId: meetingId || '0123456789',
    }

    this.props.changeBook(book);*/

    //firebase.push(`users/${this.props.currentUser.uid}`, book);
    //firebase.push(`users/${this.state.selectedAdvisor.uid}`, book);
  }

  onWeekChange = (dayInTheWeek) => {
    let dayParse = moment().isoWeekday(dayInTheWeek).format('YYYY-MM-DD')
    dayParse = moment(dayParse).isAfter(moment().format('YYYY-MM-DD')) ?
    dayParse :
    moment(dayParse).add(7, 'days').format('YYYY-MM-DD');
    const timeList = this.getTimeArray(dayParse, this.state.duration, dayInTheWeek);

    this.setState({
      dayInTheWeek: dayInTheWeek,
      selectedDate: null,
      timeList: timeList
    });
  }

  onNumberChange = (numberValue) => {
    this.setState({numberOfConversation: numberValue})
  }

  setBook = (selectedDate, timeList, dayInTheWeek) => {
    const selectedBook = timeList.filter(item => item.book === true);

    const bookSelectedAdvisor = this.state.bookSelectedAdvisor;
    const bookCurrentUser = this.state.bookCurrentUser;

    if (selectedBook.length > 0) {
      if (dayInTheWeek === 0) {

        const bookDay = {
          day: selectedDate,
          bookTime: selectedBook[0].time,
          userHost: this.props.navigation.state.params.selectedAdvisor.key,
          userGuest: this.props.currentUser.uid,
          typeCall: this.state.typeCall,
        }

        bookSelectedAdvisor.days ? bookSelectedAdvisor.days : bookSelectedAdvisor.days = []
        bookCurrentUser.days ? bookSelectedAdvisor.days : bookCurrentUser.days = []

        bookSelectedAdvisor.days.push(bookDay);
        firebase.update(`users/${this.props.navigation.state.params.selectedAdvisor.key}`, { book: bookSelectedAdvisor });

        bookCurrentUser.days.push(bookDay);
        this.props.changeBook(bookCurrentUser);
        firebase.update(`users/${this.props.currentUser.uid}`, { book: bookCurrentUser });
      } else {

        const bookWeek = {
          days: [],
          bookTime: selectedBook[0].time,
          userHost: this.props.navigation.state.params.selectedAdvisor.key,
          userGuest: this.props.currentUser.uid,
          typeCall: this.state.typeCall,
        }

        let day = moment().isoWeekday(dayInTheWeek).format('YYYY-MM-DD');

        while (this.state.numberOfConversation > bookWeek.days.length) {
          if (moment(day).isAfter(moment().format('YYYY-MM-DD'))) {
            bookWeek.days.push(day);
          }
          day = moment(day).add(7, 'days').format('YYYY-MM-DD');
        }

        bookSelectedAdvisor[dayInTheWeek] ? bookSelectedAdvisor[dayInTheWeek] : bookSelectedAdvisor[dayInTheWeek] = []
        bookCurrentUser[dayInTheWeek] ? bookSelectedAdvisor[dayInTheWeek] : bookCurrentUser[dayInTheWeek] = []

        bookSelectedAdvisor[dayInTheWeek].push(bookWeek);
        firebase.update(`users/${this.props.navigation.state.params.selectedAdvisor.key}`, { book: bookSelectedAdvisor });

        bookCurrentUser[dayInTheWeek].push(bookWeek);
        this.props.changeBook(bookCurrentUser);
        firebase.update(`users/${this.props.currentUser.uid}`, { book: bookCurrentUser });
      }

    } else {
      alert('You did not choose time!');
    }
  }

  render () {
    const minDateCalendar = moment().format('YYYY-MM-DD');

    let customDatesStyles = [];
    if (this.state.availability && this.state.availability.days && this.state.availability.days.length > 0) {
      customDatesStyles = this.state.availability.days.map((item) => {
        return {
          date: item.day,
          style: { backgroundColor: 'rgba(75, 170, 208, 0.4)' },
          textStyle: { color: '#ffffff' },
        };
      })
    }

    const daysWeek = [];
    let i = 1;
    for (var property in this.state.availability) {
      if (property !== 'days') {
        daysWeek.push(
          <Picker.Item label={ property } value={ property } key={ i }/>
        );
        i++;
      }
    }

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = { `Book ${this.state.timeZone}` }
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView>
          <View style = { style.formWrapp }>
            <View style = { style.label }>
              <Text>
                Select Date
              </Text>
            </View>
            <View style = { style.form }>
              <CalendarPicker
                //allowRangeSelection = {true}
                minDate = { minDateCalendar }
                selectedStartDate = { this.state.selectedStartDate }
                selectedEndDate = { this.state.selectedEndDate }
                customDatesStyles = { customDatesStyles }
                todayBackgroundColor = '#ffffff'
                todayTextStyle = {{ fontWeight: 'bold' }}
                selectedDayColor = '#4baad0'
                selectedDayTextColor = '#FFFFFF'
                width = { 220 }
                previousTitle = '<'
                nextTitle = '>'
                onDateChange={ this.onDateChange }
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
                  { daysWeek }
                </Picker>
              </View>
            </View>
          </View>

          <View style = { style.formWrapp }>
            <View style = { style.label }>
              <Text>
                Number of conversation
              </Text>
            </View>
            <View style = { style.form }>
              <View style = {style.selectDay}>
                <Picker
                  selectedValue = { this.state.numberOfConversation }
                  onValueChange = {
                    (itemValue, itemIndex) => {
                      this.onNumberChange(itemValue);
                    }
                  }
                  style = {{ color: '#555', height: 30, }}>
                  <Picker.Item label={ '1' } value={ 1 } key={ 1 }/>
                  <Picker.Item label={ '2' } value={ 2 } key={ 2 }/>
                  <Picker.Item label={ '3' } value={ 3 } key={ 3 }/>
                  <Picker.Item label={ '4' } value={ 4 } key={ 4 }/>
                  <Picker.Item label={ '5' } value={ 5 } key={ 5 }/>
                </Picker>
              </View>
            </View>
          </View>

         <TimeList
            type = 'BOOK'
            timeList = {this.state.timeList}
            changeBook = {this.changeBook}
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
              text = 'Add to Calendar'
              onPress = { () => {
                this.setBook(this.state.selectedDate, this.state.timeList, this.state.dayInTheWeek)
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
    changeBook: bindActionCreators(changeBook, dispatch),
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]),
  connect(mapStateToProps, {
    changeBook
}))(Book);
