import React from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment'

import firebase from 'firebase';
import { firebaseConnect, getVal, isLoaded, isEmpty } from 'react-redux-firebase';

import Header from '../../../components/Header';
import Appointment from '../../../components/Appointment';

import style from './style';

class AppointmentsScreen extends React.Component {
  static navigationOptions = {
    title: 'Appointments',
  };

  constructor (props) {
    super(props);

    this.state = {
      appointments: [],
      book: this.props.currentUser.book || {},
    }
  }

  sortDay = (a, b) => {
    const timeA = moment(a.date + ' ' + a.time, 'dddd, MMMM Do YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    const timeB = moment(b.date + ' ' + b.time, 'dddd, MMMM Do YYYY HH:mm').format('YYYY-MM-DD HH:mm')

    if (moment(timeA).isAfter(timeB)) {
      return 1;
    }
    if (moment(timeA).isBefore(timeB)) {
      return -1;
    }
  }

  render () {
    const now = moment().format('YYYY-MM-DD');

    let bookAppointments = [];

    for (var property in this.state.book) {
      if (property !== 'days') {
        this.state.book[property].forEach(element => {
          element.days.forEach(item => {
            const book = {
              date: moment(item).format('dddd, MMMM Do YYYY'),
              time: element.bookTime.hours + ':' + (element.bookTime.minutes == 0 ? (element.bookTime.minutes + '0') : (element.bookTime.minutes)),
              type: element.typeCall || 'audio',
              withUserUid: element.userHost
            }

            if (element.userHost === this.props.currentUser.uid) {
              book.withUserUid = userGuest;
            }

            bookAppointments.push(book)
          })
        })
      } else {
        this.state.book[property].forEach(element => {
            const book = {
              date: moment(element.day).format('dddd, MMMM Do YYYY'),
              time: element.bookTime.hours + ':' + (element.bookTime.minutes == 0 ? (element.bookTime.minutes + '0') : (element.bookTime.minutes)),
              type: element.typeCall || 'audio',
              withUserUid: element.userHost
            }

            if (element.userHost === this.props.currentUser.uid) {
              book.withUserUid = userGuest;
            }

            bookAppointments.push(book)
        });
      }
    }

    bookAppointments = bookAppointments.filter((value) => moment(moment(value.date, 'dddd, MMMM Do YYYY').format('YYYY-MM-DD HH:mm')).isSameOrAfter(now));
    bookAppointments.sort(this.sortDay);

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Appointments'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <View style = {{ flex: 1 }}>
            <FlatList
              data = { bookAppointments }
              renderItem = { ({ item }) => <Appointment key = { item.id } appointment = { item } id={ 'CCVkE2D6s7YvOjgEtW7YEKA6be13' }/> }
              keyExtractor={ (item, index) => index.toString() }
            />
          </View>
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

export default connect(mapStateToProps)(AppointmentsScreen);
