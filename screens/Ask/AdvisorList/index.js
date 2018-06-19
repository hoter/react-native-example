import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { View, Text, ScrollView } from 'react-native';

import Header from '../../../components/Header';
import CustomButton from '../../../components/ui/CustomButton';
import ProfileItem from '../../../components/ProfileItem';

import { loadAdvisors } from '../../../redux/actions/UserActions';

import style from './style';

class AdvisorListScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  filterByCategory (users, category) {
    const map = Object.keys(users).map(
      (key, id) => ({ key, data: users[key] })
    );

    const filtered = map.filter(
      (value) => value.data.info.keyword && value.data.info.keyword.some(keyword => {
        return keyword === category.toString()
      })
    );

    return filtered;
  }

  getProfileItem (value, key) {
    return <ProfileItem
      key = { value.key }
      profile = { value.data }
      withName = { true }
      onPress = { () => {
        this.props.loadAdvisors(this.filterByCategory(this.props.users, this.props.question.category));
        this.props.navigation.navigate('AdvisorProfile', {
          uid: value.key,
          type: 'ADD_ADVISOR'
        });
      }}
    />
  }

  render () {
    const question = this.props.question;
    const emptyList = <View style = { style.fill }>
        <Text style = { style.fillText }>No more advisors are available</Text>
        <CustomButton
          style={{ marginTop: 20 }}
          text = 'Go Back'
          textStyle = { style.fillTextButton }
          onPress = { () => { this.props.navigation.pop() } }
        />
      </View>;
    let users = null;

    if (question.selectedAdvisors.length <= 0) {
      if (isLoaded(this.props.users) && !isEmpty(this.props.users)) {
        users = this.filterByCategory(this.props.users, question.category).map(this.getProfileItem.bind(this));
      }
    } else {
      const allAdvisors = this.props.loadedAdvisors;
      const data = allAdvisors.filter(
        advisor => question.selectedAdvisors.every(id => advisor.key !== id)
      );
      if (data.length > 0) {
        users = data.map((value, key) => (this.getProfileItem.bind(this)));
      }
    }

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Select an Advisor'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView style = {{ flex: 1 }}>
            { (users && users.length) ? users : emptyList }
          </ScrollView>
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
  }))(AdvisorListScreen);
