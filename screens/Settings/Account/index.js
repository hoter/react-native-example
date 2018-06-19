import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';

import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import Header from '../../../components/Header';
import TogglePanel from '../../../components/Settings/TogglePanel';

import { editFirstName, editLastName, editTimeZone } from '../../../redux/actions/UserActions';

import { colors } from '../../../styles/base';
import style from './style';
import CustomButton from '../../../components/ui/CustomButton';
import TimeZone from '../../../components/TimeZone';

class Account extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      timeZone: this.props.currentUser.info.timeZone || "(GMT +0)",
      info:this.props.currentUser.info
    };
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  editUserFirstName(param) {
    this.props.editFirstName(param);
    this.setState({ firstName: param });
  }

  editUserLastName(param) {
    this.props.editLastName(param);
    this.setState({ lastName: param });
  }

  saveInfo() {
    firebase.update(`users/${this.props.currentUser.uid}`, { firstName: this.props.currentUser.firstName });
    firebase.update(`users/${this.props.currentUser.uid}`, { lastName: this.props.currentUser.lastName });
    firebase.update(`users/${this.props.currentUser.uid}/info`, { timeZone: this.props.currentUser.info.timeZone });
    this.props.navigation.navigate('Me');
  }

  valueChange = (itemValue) => {
    this.setState({ timeZone: itemValue });
    this.props.editTimeZone(itemValue);
  }

  render () {
    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Account'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView>
            <TogglePanel label = 'First Name'>
            <TextInput style = {[ style.settingsInput, style.settingsInputSingle ]}
                placeholder = 'First Name'
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.firstName }
                onChangeText = { (text) => this.editUserFirstName(text) }
              />
            </TogglePanel>

            <TogglePanel label = 'Last Name'>
              <TextInput style = {[ style.settingsInput, style.settingsInputSingle ]}
                placeholder = 'Last Name'
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.lastName }
                onChangeText = { (text) => this.editUserLastName(text) }
              />
            </TogglePanel>

            <TogglePanel label = 'GMT'>
              <TimeZone valueChange = {this.valueChange} timeZone = {this.state.timeZone}/>
            </TogglePanel>

            <CustomButton
              text = 'Save'
              style = { style.saveButton }
              textStyle = { style.saveButtonText }
              onPress = { () => this.saveInfo() }
              disabled = { this.state.save }
            />
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
};

function mapDispatchToProps(dispatch) {
  return {
    editFirstName: bindActionCreators(editFirstName, dispatch),
    editLastName: bindActionCreators(editLastName, dispatch),
    editTimeZone: bindActionCreators(editTimeZone, dispatch)
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]),connect(mapStateToProps, {
    editFirstName,
    editLastName,
    editTimeZone,
  }))(Account);
