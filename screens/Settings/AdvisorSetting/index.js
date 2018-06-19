import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TouchableOpacity, Text, Image, DeviceEventEmitter } from 'react-native';

import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import { editUserVideoSettings } from '../../../redux/actions/UserActions';

import CustomButton from '../../../components/ui/CustomButton';

import SettingsMenu from '../../../components/Settings/Menu';
import Header from '../../../components/Header';
import style from './style';

class AdvisorSetting extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      audioSettings: this.props.currentUser.status.audio,
      videoSettings: this.props.currentUser.status.video,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('changeSetting', (e)=>{
      this.setState({audioSettings: this.props.currentUser.status.audio});
    })
  }

  editVideoSettings(param) {
    if (param) {
      this.props.editUserVideoSettings(false);
      this.setState({ videoSettings: false });
      firebase.update(`users/${this.props.currentUser.uid}/status`, { video: false });
    } else {
      this.props.editUserVideoSettings(true);
      this.setState({ videoSettings: true });
      firebase.update(`users/${this.props.currentUser.uid}/status`, { video: true });
    }
  }

  render () {

    const audioStatus = this.props.currentUser.status.audio ? 'ON' : 'OFF';
    const videoStatus = this.state.videoSettings ? 'ON' : 'OFF';

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Advisor Setting'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <View>
          <SettingsMenu
              menuItems = {[
                { label: 'Areas I Advisor', url: 'AreasIAdvisor'},
                { label: 'Audio Session', url: 'AudioSession', logo: require('../../../assets/images/icons/audio.png'), value: audioStatus },
              ]}
            />

          <TouchableOpacity
            style = { style.menuItem }
            onPress = { () => {this.editVideoSettings(this.state.videoSettings)}}
            >
            <View style = { style.menuItemWrapText }>
              <Text style = { style.menuItemText }>
                Video Session
              </Text>
              <Image source = { require('../../../assets/images/icons/video.png') } style={ style.menuItemLogo }/>
            </View>
            <View style = { style.menuItemWrapText }>
              <Text style = { style.menuItemValue }>
                { videoStatus }
              </Text>
            </View>
          </TouchableOpacity>
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
    editUserVideoSettings: bindActionCreators(editUserVideoSettings, dispatch)
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]), 
  connect(mapStateToProps, {
  editUserVideoSettings
}))(AdvisorSetting);
