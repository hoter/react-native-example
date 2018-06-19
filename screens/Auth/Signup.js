import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Alert, View, Text, Image, TextInput } from 'react-native';
import { createNewUser } from '../../controllers/AuthController';
import CustomButton from '../../components/ui/CustomButton';
import { colors } from '../../styles/base';
import style from './style';

import { userLogin } from '../../redux/actions/UserActions';

class SignupScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      userId: null,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profile.isLoaded && !nextProps.profile.isEmpty && nextProps.auth.uid) {
      const profile = nextProps.profile;
      profile['uid'] = nextProps.auth.uid;

      this.props.userLogin(
        nextProps.profile
      );

      this.props.navigation.navigate('Main');
    }
  }

  signUp () {
    if (this.state.password.length && this.state.email.length) {
      const creds = {
        email: this.state.email,
        password: this.state.password,
      };

      createNewUser(creds).then(response => {})
      .catch(error => {
        alert(error)
      });
    }
  }

  //TODO: native keyboard overlap a half of screen
  render () {
    return (
        <View style = { style.container }>
          <View style = {[ style.content, style.vCenter ]}>
            <View style = {[ style.hCenter, style.logoWrapper ]}>
              <Image
                style = { style.logo }
                source = { require('../../assets/images/logo--white.png') }
              />
            </View>
            <View style = {[ style.hCenter, style.form ]}>
              <Text style = {[ style.label ]}>Sign Up</Text>

              <TextInput style = { style.text }
                placeholder = 'Email'
                underlineColorAndroid = { colors.base }
                selectionColor = { colors.base }
                onChangeText = { (email) => this.setState({ email }) }
                keyboardType = 'email-address'
              />

              <TextInput style = { style.text }
                placeholder = 'Password'
                secureTextEntry = {true}
                underlineColorAndroid = { colors.base }
                selectionColor = { colors.base }
                onChangeText = { (password) => this.setState({ password }) }
              />

              <CustomButton
                text = 'Sign Up'
                style = {[ style.btn, style.submit ]}
                textStyle = { style.btnText }
                onPress = { () => this.signUp() }
              />

              <CustomButton
                style = { style.signIn }
                textStyle = { style.signInText }
                text = 'Have an account?'
                onPress = { () => this.props.navigation.navigate('Login') }
              />
            </View>
          </View>
        </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, { userLogin })
)(SignupScreen);
