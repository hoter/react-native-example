import React from 'react';
import { View, Text, } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { setQuestionParam } from '../../redux/actions/QuestionAction';
import { addConnection } from '../../redux/actions/UserActions';

import firebase from 'firebase';

import Header from '../../components/Header';
import ProfileItem from '../../components/ProfileItem';
import Keywords from '../../components/Keywords';
import CustomButton from '../../components/ui/CustomButton';

import style from './style';

class AdvisorListScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      typeScreen: this.props.navigation.state.params.type,
      connections: this.props.currentUser.connections || [],
    };
  }

  getSelectedAdvisor () {
    const uid = this.props.navigation.state.params.uid;
    return this.props.advisors.filter(
      (value) => value.key === uid
    )[0];
  }

  addAdvisorToList (id) {
    let selectedAdvisors = this.props.question.selectedAdvisors;
    selectedAdvisors.push(id);

    this.props.setQuestionParam({
      param: 'selectedAdvisors',
      value: selectedAdvisors,
    });

    this.props.navigation.navigate('SelectedAdvisorsList');
  }

  removeAdvisorFromList (id) {
    let selectedAdvisors = this.props.question.selectedAdvisors;
    this.props.setQuestionParam({
      param: 'selectedAdvisors',
      value: selectedAdvisors.filter(val => val !== id)
    });

    this.props.navigation.navigate('SelectedAdvisorsList');
  }

  /**
  * Checking a user has this connection or not.
  * @return bool (false - this connection exists or this is the user theirself)
  */
  hasConnection (selectedAdvisor) {
    return this.state.connections.includes(selectedAdvisor.key) || this.props.currentUser.uid == selectedAdvisor.key;
  }

  addConnection (selectedAdvisor) {
    const connections = this.state.connections;
    if (!this.hasConnection(selectedAdvisor)) {
      connections.push(selectedAdvisor.key);
      this.props.addConnection(selectedAdvisor.key);
      firebase.update(`users/${this.props.currentUser.uid}`, { connections: connections });
      this.setState({connections: connections});
    }
  }

  render() {
    let selectedAdvisor = this.getSelectedAdvisor();

    let AdvisorActions = null;
    if (this.state.typeScreen === 'ADD_ADVISOR') {
      AdvisorActions = <CustomButton
        style = { style.addToListButton }
        textStyle = { style.addToListText }
        text = 'Add to list'
        onPress = { () => this.addAdvisorToList(selectedAdvisor.key) }
      />
    } else if (this.state.typeScreen === 'REMOVE_ADVISOR') {
      AdvisorActions = <CustomButton
        style = { style.addToListButton }
        textStyle = { style.addToListText }
        text = 'Remove from list'
        onPress = { () => this.removeAdvisorFromList(selectedAdvisor.key) }
      />
    } else if (this.state.typeScreen === 'CONNECTION_ADVISOR') {
      AdvisorActions = <View><CustomButton
        style = { [style.addToListButton, {marginBottom: 15}] }
        textStyle = { style.addToListText }
        text = 'Book a Audio Conversation'
        onPress = { () => this.props.navigation.navigate('Book', {
          selectedAdvisor: selectedAdvisor,
          typeCall: 'audio'
        }) }
      />
      <CustomButton
        style = { style.addToListButton }
        textStyle = { style.addToListText }
        text = 'Book a Video Conversation'
        onPress = { () => this.props.navigation.navigate('Book', {
          selectedAdvisor: selectedAdvisor,
          typeCall: 'video'
        }) }
      />
      </View>
    }
    const buttons = <CustomButton
      imageStyle = { style.headerImageIcon }
      imageSource = { require('../../assets/images/icons/add-user.png') }
      onPress = { () => this.addConnection(selectedAdvisor) }
    />

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = {
              `${ selectedAdvisor.data.firstName } ${ selectedAdvisor.data.lastName && selectedAdvisor.data.lastName.charAt(0).toUpperCase() + '.' }`
            }
            isModalScreen = { true }
            navigation =  { this.props.navigation }
            buttons = {this.hasConnection(selectedAdvisor) ? null : buttons}
          />

          <View style = {{ flex: 1 }}>
            <ProfileItem style = {{ borderBottomWidth: 0 }} profile = { selectedAdvisor.data } />
            <Keywords isClickable = { false } keywords = { selectedAdvisor.data.info.keyword } />
            <Text style = { style.text }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          </View>

          <View style = {{ position: 'absolute', bottom: 20, left: 10, right: 10, }}>
            { AdvisorActions }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  question: state.question,
  advisors: state.user.loadedAdvisors,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, {
  setQuestionParam,
  addConnection
})(AdvisorListScreen);
