import React from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator, TabBarTop, NavigationActions } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { routes, userRoutes, config } from '../../Routes';
import CustomTab from './CustomTab';

const MainScreens = TabNavigator({
  ...userRoutes,
}, {
  tabBarPosition: 'bottom',
  lazy: false,
  tabBarComponent: CustomTab,
});

export const AppNavigator = StackNavigator({
  Main: MainScreens,
  ...routes,
}, config);

export const middleware = createReactNavigationReduxMiddleware(
  "app",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("app");

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress () {
    const { dispatch, nav } = this.props;
    const activeRoute = nav.routes[nav.index];
    if (activeRoute.routeName === "Home" || activeRoute.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    return (
      <AppNavigator
        navigation = { addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    );
  }
}


const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
