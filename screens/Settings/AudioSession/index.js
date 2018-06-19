import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TouchableOpacity, Text, Image, DeviceEventEmitter } from 'react-native';

import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import { editUserAudioSettings } from '../../../redux/actions/UserActions';

import CustomButton from '../../../components/ui/CustomButton';

import SettingsMenu from '../../../components/Settings/Menu';
import Header from '../../../components/Header';
import style from './style';

class AudioSession extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      audioSettings: this.props.currentUser.status.audio,
    };
  }

  editAudioSettings(param) {
    if (param) {
      this.props.editUserAudioSettings(false);
      this.setState({ audioSettings: false });
      firebase.update(`users/${this.props.currentUser.uid}/status`, { audio: false });
      DeviceEventEmitter.emit('changeSetting', {});
    } else {
      this.props.editUserAudioSettings(true);
      this.setState({ audioSettings: true });
      firebase.update(`users/${this.props.currentUser.uid}/status`, { audio: true });
      DeviceEventEmitter.emit('changeSetting', {});
    }
  }

  render () {
    //DeviveEventEmitter.emit('changeSetting',  {});
    const audioStatus = this.state.audioSettings ? 'ON' : 'OFF';

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Audio Conversation'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <View>
            <TouchableOpacity
              style = { style.menuItem }
              onPress = { () => {this.editAudioSettings(this.state.audioSettings)}}
              >
              <View style = { style.menuItemWrapText }>
                <Text style = { style.menuItemText }>
                  Audio Session
                </Text>
                <Image source = { require('../../../assets/images/icons/audio.png') } style={ style.menuItemLogo }/>
              </View>
              <View style = { style.menuItemWrapText }>
                <Text style = { style.menuItemValue }>
                  { audioStatus }
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={ style.menuItem }
              disabled = { !this.state.audioSettings }
              >
              <View style={ !this.state.audioSettings ? style.menuItemWrapTextDisabled : style.menuItemWrapText}>
                <Text style = { style.menuItemText }>
                  Duration
                </Text>
              </View>
              <View style={ !this.state.audioSettings ? style.menuItemWrapTextDisabled : style.menuItemWrapText}>
                <Text style = { style.menuItemValue }>
                  30min
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={ style.menuItem }
              disabled = { !this.state.audioSettings }
              >
              <View style={ !this.state.audioSettings ? style.menuItemWrapTextDisabled : style.menuItemWrapText}>
                <Text style = { style.menuItemText }>
                  Charging Rate
                </Text>
              </View>
              <View style={ !this.state.audioSettings ? style.menuItemWrapTextDisabled : style.menuItemWrapText}>
                <Text style = { style.menuItemValue }>
                  Free
                </Text>
              </View>
            </TouchableOpacity>

            <SettingsMenu
              menuItems = {[
                { label: 'Availability', url: 'Availability'},
              ]}
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

function mapDispatchToProps(dispatch) {
  return {
    editUserAudioSettings: bindActionCreators(editUserAudioSettings, dispatch)
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]), 
  connect(mapStateToProps, {
    editUserAudioSettings,
}))(AudioSession);
