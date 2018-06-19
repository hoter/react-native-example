import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Search from 'react-native-search-box';

import CustomButton from '../../components/ui/CustomButton';
import Header from '../../components/Header';
import ProfileItem from '../../components/ProfileItem';

import style from './style';

import { loadAdvisors } from '../../redux/actions/UserActions';

class ConnectionsScreen extends React.Component {
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

  filterByUsers (users) {
    if (!(this.props.currentUser && this.props.currentUser.connections)) {
      return [];
    }

    return users.filter((val, uid) => this.props.currentUser.connections.includes(val.key));
  }

  findVal (obj, val) {
    const flatArr = (obj) => {
      return Object.values(obj).reduce((res, item) => {
        if (typeof(item) !== 'object') {
          return res.concat(item.toString());
        }
        return res.concat(...flatArr(item));
      }, []);
    };

    return !val ? [] : flatArr(obj).filter(item => item.toLowerCase().includes(val.toLowerCase().trim()));
  }

  onSearch (value) {
    if (!value) {
      return this.onCancel();
    }

    let users = this.state.fullUsers;
    users = users.filter(val => {
      return this.findVal(val, value).length;
    });
    this.setState({ users: users })
  }

  onCancel () {
    this.setState({ users: this.state.fullUsers })
  }

  render () {
    const buttons = <CustomButton
      imageStyle = { style.headerImageIcon }
      imageSource = { require('../../assets/images/icons/add-user.png') }
      onPress = { () => this.props.navigation.navigate('FindConnections')}
    />
    let usersw = <Text>Loading...</Text>;

    if (isLoaded(this.props.users)) {
      usersw = isEmpty(this.state.users)
        ? <Text>Empty list.. Please, add a new connection.</Text>
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
            title = 'Advisors'
            isModalScreen = { false }
            navigation =  { this.props.navigation }
            buttons = { buttons }
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
)(ConnectionsScreen);
