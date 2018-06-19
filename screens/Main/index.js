import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { userLogin } from '../../redux/actions/UserActions';

import CustomButton from '../../components/ui/CustomButton';
import Header from '../../components/Header';
import style from './style';
import { loginUser } from '../../controllers/AuthController';

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main',
  };

  constructor (props) {
    super(props);
  }

  render () {
    const buttons = <CustomButton
      imageStyle = { style.headerImageIcon }
      imageSource = { require('../../assets/images/icons/calendar.png') }
      onPress = { () => this.props.navigation.navigate('Appointments') }
    />

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Main'
            isModalScreen = { false }
            navigation =  { this.props.navigation }
            buttons = { buttons }
          />
          <View style = {{ flex: 1 }}>
            <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <CustomButton
                style = {{ alignItems: 'center' }}
                text = 'Ask a Career Advisor'
                textStyle = {{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
                imageSource = { require('../../assets/images/main-icons/ask-icon.png') }
                imageStyle = {{ width: 96, height: 96, resizeMode: Image.resizeMode.contain, marginBottom: 20, }}
                onPress = { () => { this.props.navigation.navigate('AskAdvisors') }}
              />
            </View>
            <View style = {{ flex: 1,  alignItems: 'center' }}>
              <CustomButton
                style = {{ alignItems: 'center' }}
                text = 'Be a Career Advisor'
                textStyle = {{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
                imageSource = { require('../../assets/images/main-icons/mentor-icon.png') }
                imageStyle = {{ width: 96, height: 96, resizeMode: Image.resizeMode.contain, marginBottom: 20, }}
                onPress = { () => { this.props.navigation.navigate('AdvisorSetting') } }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firebase.data.users,
    currentUser: state.user.currentUser,
  };
}

export default compose(
  withFirebase,
  connect(mapStateToProps, {
    userLogin
  }),
)(MainScreen);
