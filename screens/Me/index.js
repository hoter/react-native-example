import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import { userLogin } from '../../redux/actions/UserActions';
import { signOut } from '../../controllers/AuthController';
import CustomButton from '../../components/ui/CustomButton';
import SettingsMenu from '../../components/Settings/Menu';
import AccountPreview from '../../components/AccountPreview';
import Header from '../../components/Header';
import style from './style';

class MeScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  };

  logout () {
    this.props.navigation.navigate('Splash', {
      type: 'LOGOUT'
    });
  }

  render () {
    const preview = this.props.currentUser
    ? <AccountPreview account = { this.props.currentUser } />
    : null;

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Me'
            isModalScreen = { false }
            navigation =  { this.props.navigation }
          />
          <View>
            { preview }
          </View>
          <View style = {{ flex: 2 }}>
            <SettingsMenu
              menuItems = {[
                { label: 'Professional Profile', url: 'ProfessionalProfile'},
                { label: 'Advisor Setting', url: 'AdvisorSetting'},
                { label: 'Account', url: 'Account'},
                { label: 'Invite Friends', url: 'Invite'},
              ]}
            />
          </View>
          <View style = {{ flex: 1 }}>
            <CustomButton
              text = 'Logout'
              onPress = { () => { this.logout() } }
            />
          </View>
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

export default connect(mapStateToProps, { userLogin })(MeScreen);
