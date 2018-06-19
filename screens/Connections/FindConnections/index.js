import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Search from 'react-native-search-box';

import CustomButton from '../../../components/ui/CustomButton';
import Header from '../../../components/Header';
import ProfileItem from '../../../components/ProfileItem';

import style from './style';

import { loadAdvisors } from '../../../redux/actions/UserActions';

class FindConnectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Advisors',
  };

  constructor (props) {
    super(props);

    let map = [];
    if (this.props.users) {
      map = Object.keys(this.props.users).map(
        (key, id) => ({ key, data: this.props.users[key] })
      );
    }

    this.state = {
      users: map,
      fullUsers: map,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  filterByUsers (users) {
    if (!this.props.currentUser.connections) {
      return users.filter((val, uid) => val.key != this.props.currentUser.uid);
    }
    return users.filter((val, uid) => !(this.props.currentUser.connections.includes(val.key) || val.key == this.props.currentUser.uid));
  }

  /**
   * Search by first name, last name and keywords (if they contain the search value)
   */
  onSearch (value) {
    if (!value) {
      return this.onCancel();
    }

    let users = this.state.fullUsers;
    users = users.filter(val => {
      if (val.data.firstName.indexOf(value) > -1) {
        return true;
      }
      if (val.data.lastName.indexOf(value) > -1) {
        return true;
      }
      if (val.data.info.keyword && val.data.info.keyword.length) {
        for (let i = 0; i < val.data.info.keyword.length; i++) {
          if (val.data.info.keyword[i].indexOf(value) > -1) {
            return true;
          }
        }
      }
      return false;
    });
    this.setState({ users: users })
  }

  onCancel () {
    this.setState({ users: this.state.fullUsers })
  }

  render () {
    let usersw = <Text>Loading...</Text>;

    if (isLoaded(this.props.users)) {
      usersw = isEmpty(this.state.users)
        ? <Text>Empty list..</Text>
        : this.filterByUsers(this.state.users).map(
          (value, key) => (
            <ProfileItem
              key = { value.key }
              profile = { value.data }
              withName = { true }
              onPress = { () => {
                this.props.loadAdvisors(this.filterByUsers(this.state.users));
                this.props.navigation.navigate('AdvisorProfile', {
                  uid: value.key,
                  type: 'CONNECTION_ADVISOR'
                });
              } }
            />
          )
        );
    }

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Find an advisor'
            isModalScreen = { false }
            navigation =  { this.props.navigation }
          />
          <View style = {{ flex: 1 }}>
            <Search ref="search_box"
              backgroundColor='#fff'
              placeholderTextColor="#666"
              titleCancelColor="#666"
              tintColorSearch="#2cacd1"
              inputBorderRadius={50}
              inputStyle={styles.input}
              onSearch={ value => { this.onSearch(value) }}
              onCancel={ () => { this.onCancel() } } />
            { usersw }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#2cacd1",
    borderWidth: 1,
  },
});

const mapStateToProps = state => {
  return {
    users: state.firebase.data.users,
    loadedAdvisors: state.user.loadedAdvisors,
    currentUser: state.user.currentUser,
  };
}

export default compose(
  firebaseConnect([
    'users',
  ]),
  connect(mapStateToProps, {
    loadAdvisors
  })
)(FindConnectionsScreen);
