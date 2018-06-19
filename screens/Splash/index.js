import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import firebase from 'firebase'
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import CustomButton from '../../components/ui/CustomButton';
import { userLogin } from '../../redux/actions/UserActions';

class SplashScreen extends React.Component {
  constructor (props) {
    super (props);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.users && !nextProps.currentUser)  {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const userData = this.props.users[user.uid];
          userData['uid'] = user.uid;

          this.props.userLogin(userData);
          this.props.navigation.navigate('Main');
        }
      });
    }
  }

  componentDidMount () {
    const params = this.props.navigation.state.params;
    if (params && params.type === 'LOGOUT') {
      firebase.auth().signOut().then(response => {
        this.props.userLogin(null);
      }).catch(error => {
        console.error(error);
      });
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
        this.props.navigation.navigate('Home'); }
      });
    }
  }

  render () {
    return (
      <View style = { styles.home }>
        <View style = { styles.logoWrapper }>
          <Image
            style = { styles.logo }
            source = { require('../../assets/images/logo.png') }
            />
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    users: state.firebase.data.users,
  };
};

export default compose(
  firebaseConnect(['users']),
  connect(mapStateToProps, {
    userLogin
  }),
)(SplashScreen);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4aaad0',
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
