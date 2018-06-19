import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';

import style from './style';

export default class TogglePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: true,
      animation: new Animated.Value(),
      minHeight: 45,
      maxHeight: 0,
    };
  }

  componentDidMount () {
    this.toggle();
  }

  toggle () {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded : !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation,
      { toValue: finalValue }
    ).start();
  }

  _setMaxHeight (event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  _setMinHeight (event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  render () {
    const paddingBottom = this.state.expanded ? 5 : 0;

    return (
      <Animated.View style = {[ style.togglePanel, { height: this.state.animation } ]}>
        <View>
          <TouchableOpacity
            style = { style.togglePanelBtn}
            onPress = { () => this.toggle() }
          >
            <Text style = {[ style.togglePanelLabel, { paddingBottom: paddingBottom } ]}>
              { this.props.label }
            </Text>
          </TouchableOpacity>
        </View>
        <View style = { style.togglePanelContent } onLayout = { this._setMaxHeight.bind(this) }>
          { this.props.children }
        </View>
      </Animated.View>
    );
  }
}
