import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/ui/CustomButton';
import firebase from 'firebase'

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style = { styles.home }>
        <View style = { styles.logoWrapper }>
          <Image
            style = { styles.logo }
            source = { require('../assets/images/logo.png') }
            />
        </View>
        <View style = { styles.buttonWrapper }>
          <CustomButton
            style = { styles.button }
            textStyle = { styles.buttonText }
            text = 'Login'
            onPress = { () => this.props.navigation.navigate('Login') }
          />
          <CustomButton
            text = 'Sign up'
            textStyle = { styles.buttonUnderlineText }
            style = { styles.buttonUnderline }
            onPress = { () => this.props.navigation.navigate('Signup') }
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4baad0',
  },
  logo: {
    width: 300,
    resizeMode: Image.resizeMode.contain,
  },
  logoWrapper: {
    flex: 2,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  buttonUnderline: {
    marginTop: 10,
  },
  buttonUnderlineText: {
    color: '#386ea2',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
