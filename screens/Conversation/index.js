import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text } from 'react-native';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import CustomButton from '../../components/ui/CustomButton';
import Header from '../../components/Header';
import ConversationList from './ConversationList';
import style from './style';

const ConversationScreen = ({ auth, navigation }) => {
  const headerButton = <CustomButton
    imageStyle = { style.headerImageIcon }
    imageSource = { require('../../assets/images/icons/edit-profile.png') }
    onPress = { () => navigation.navigate('AskAdvisors') }
  />

  return (
    <View style = { style.container }>
      <View style = { style.content }>
        <Header
          title = 'Conversation'
          isModalScreen = { false }
          buttons = { headerButton }
        />
        <View style = {{ flex: 1 }}>
          { !isLoaded(auth) ? <Text>Loading...</Text> : <ConversationList auth={auth} navigation={navigation} />}
        </View>
      </View>
    </View>
  );
}

export default connect(
  ({ firebase: { auth } }) => ({ auth })
)(ConversationScreen)
