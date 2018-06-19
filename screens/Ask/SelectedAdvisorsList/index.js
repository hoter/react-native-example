import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';

import { View, Text, ScrollView } from 'react-native';

import Header from '../../../components/Header';
import CustomButton from '../../../components/ui/CustomButton';
import ProfileItem from '../../../components/ProfileItem';

import { loadAdvisors } from '../../../redux/actions/UserActions';

import style from './style';

class SelectedAdvisorListScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      advisors: [],
    };
  }

  componentWillMount() {
    const selectedAdvisorsIds = this.props.question.selectedAdvisors;
    const allAdvisors = this.props.loadedAdvisors;

    const advisors = allAdvisors.filter(
      advisor => selectedAdvisorsIds.some(id => advisor.key == id)
    );

    this.setState({ advisors });
  }

  render() {
    const category = this.props.question.category;
    const advisors = this.state.advisors;
    const users = advisors.length > 0 ? advisors.map(
      (value, key) => (
        <ProfileItem
          key = { value.key }
          profile = { value.data }
          withName = { true }
          onPress = { () => {
            this.props.navigation.navigate('AdvisorProfile', {
              uid: value.key,
              type: 'REMOVE_ADVISOR'
            });
          } }
        />
      )
    )
    : <Text style = {{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>Please, add one or more advisors</Text>;

    const submitButton = advisors.length > 0
      ? <View style = {{ position: 'absolute', bottom: 15, left: 5, right: 5, }}>
          <CustomButton
            style = { style.submitButton }
            textStyle = { style.submitButtonText }
            text = 'Ask for Help'
            onPress = {
              () => this.props.navigation.navigate('AskConfirm')
            }
          />
        </View>
      : null;

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Selected advisors'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView style = {{ flex: 1, paddingBottom: 40, }}>
            { users }
            <View>
              <CustomButton
                text = 'Add more to the list'
                imageSource = { require('../../../assets/images/icons/add-user.png') }
                style = { style.addMoreAdvisorsButton }
                textStyle = { style.addMoreAdvisorsButtonText }
                imageStyle = { style.addMoreAdvisorsButtonImage }
                onPress = { () => { this.props.navigation.navigate('AdvisorsList') } }
              />
            </View>

          </ScrollView>
          { submitButton }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.question,
    users: state.firebase.data.users,
    loadedAdvisors: state.user.loadedAdvisors
  };
};


export default compose(
  firebaseConnect([
    'users',
  ]),
  connect(mapStateToProps, {
    loadAdvisors
  }))(SelectedAdvisorListScreen);
