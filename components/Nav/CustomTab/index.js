import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Dimensions, Image } from 'react-native';
import style from './style';

const deviceWidth = Dimensions.get('window').width;
const tabWidth = ((deviceWidth * 13) / 25) / 2;


export default class TabBar extends React.Component {
  render() {
    const {
      navigation,
      jumpToIndex
    } = this.props;

    const {
      routes
    } = navigation.state;

    return (
      <View style={ style.tabBar }>
        {routes && routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const tintColor = focused ? style.activeTintColor : style.inactiveTintColor;

          const icons = {
            'main': {
              'default':  require('../../../assets/images/tab-icons/main.png'),
              'active':  require('../../../assets/images/tab-icons/main--active.png'),
            },
            'advisors': {
              'default':  require('../../../assets/images/tab-icons/connection.png'),
              'active':  require('../../../assets/images/tab-icons/connection--active.png'),
            },
            'conversation': {
              'default':  require('../../../assets/images/tab-icons/conversation.png'),
              'active':  require('../../../assets/images/tab-icons/conversation--active.png'),
            },
            'me': {
              'default':  require('../../../assets/images/tab-icons/me.png'),
              'active':  require('../../../assets/images/tab-icons/me--active.png'),
            },
          };

          const iconId = (route.key).toLowerCase();
          const iconType = focused ? 'active' : 'default';

          const icon = icons[iconId][iconType];

          return (
            <TouchableWithoutFeedback
              key = { route.key }
              style = { style.tab }
              onPress = { () => jumpToIndex(index) }
            >
              <View style = { style.tab }>
                <View style = { style.tabInner }>
                  <Image fadeDuration = { 0 } style = { style.icon } source = { icon } />
                  <Text style = {[ style.tabText, tintColor ]}>{ route.key }</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
};
