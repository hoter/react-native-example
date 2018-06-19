import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firebaseConnect, getVal } from 'react-redux-firebase';

import style from './style';

class Appointment extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      userWith: this.props.userWith
    }
  }

  render () {
    const appointment = this.props.appointment;

    let icon = null;
    if (appointment.type === 'audio') {
      icon = require('../../assets/images/icons/audio.png');
    } else if (appointment.type === 'video') {
      icon = require('../../assets/images/icons/video.png');
    }

    const name = this.state.userWith.firstName + ' ' +(this.state.userWith.lastName ? this.state.userWith.lastName.charAt(0) + '.' : '')

    return (
      <View style = { style.appointment }>
        <View style = {{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style = {{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style = { style.appointmentDate }> { appointment.date }, { appointment.time } </Text>
            <Text style = { style.appointmentDuration }> { this.state.userWith.status.duration + 'min' } with { name } </Text>
          </View>
          <View style = {{ width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
            <Image source = { icon } style = { style.icon } />
          </View>
        </View>
        <View>
          <Text style = { style.appointmentDescription }> { this.state.userWith.info.summary } </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.user.currentUser,
    userWith: state.firebase.data.users[props.appointment.withUserUid]
  };
}

export default compose(
  firebaseConnect((props) => {
    return [
      {
        path: `users/${props.id}`,
      },
    ]
  }),
  connect(mapStateToProps))(Appointment);
