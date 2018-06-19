import React from 'react';
import { connect } from 'react-redux';
import { Alert, View, Text, Image, TextInput } from 'react-native';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from 'firebase';

import { userLogin } from '../../redux/actions/UserActions';
import { loginUser } from '../../controllers/AuthController';
import CustomButton from '../../components/ui/CustomButton';

import style from './style';
import { colors } from '../../styles/base';

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userId: null,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.profile.isLoaded && !nextProps.profile.isEmpty) {
      let profile = nextProps.profile;
      profile['uid'] = this.state.userId;

      this.props.userLogin(
        nextProps.profile
      );

      this.props.navigation.navigate('Main');
    }
  }

  auth () {
    if (this.state.email.length && this.state.password.length) {
      const creds = {
        email: this.state.email,
        password: this.state.password,
      };

      loginUser(creds)
      .then(response => {
        this.setState({ userId: response.user.uid })
      })
      .catch(err => {
        alert(err);
      });
    }
  }

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
            <Text style = {[ style.label ]}>Log In</Text>

            <TextInput style = { style.text }
              placeholder = 'Email'
              underlineColorAndroid = { colors.base }
              selectionColor = { colors.base }
              onChangeText = { (email) => this.setState({ email }) }
            />

            <TextInput style = { style.text }
              placeholder = 'Password'
              secureTextEntry = {true}
              underlineColorAndroid = { colors.base }
              selectionColor = { colors.base }
              onChangeText = { (password) => this.setState({ password }) }
            />

            <CustomButton
              text = 'Log In'
              style = {[ style.btn, style.submit ]}
              textStyle = { style.btnText }
              onPress = { () => this.auth() }
            />

            <CustomButton
              style = { style.signIn }
              textStyle = { style.signInText }
              text = 'Not registered yet?'
              onPress = { () => this.props.navigation.navigate('Signup') }
            />
          </View>
        </View>
      </View>
    );
  }
};

export default compose(
  firebaseConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  }),
  { userLogin })
)(LoginScreen);

