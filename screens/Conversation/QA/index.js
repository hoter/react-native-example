import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Search from 'react-native-search-box';

import CustomButton from '../../../components/ui/CustomButton';
import Header from '../../../components/Header';

import style from '../style';

class QA extends React.Component {
  constructor (props) {
    super(props);
    const questions = Object.values(this.props.navigation.getParam('questions', {}));

    this.state = {
      questions: questions,
      fullQuestions: questions,
    };
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

    let questions = this.state.fullQuestions;
    questions = questions.filter(val => {
      return this.findVal(val, value).length;
    });
    this.setState({ questions: questions })
  }

  onCancel () {
    this.setState({ questions: this.state.fullQuestions })
  }

  render () {
    const headerButton = <CustomButton
      imageStyle = { style.headerImageIcon }
      imageSource = { require('../../../assets/images/icons/edit-profile.png') }
      onPress = { () => this.props.navigation.navigate('AskAdvisors') }
    />
    const questionList = this.state.questions.map((value, key) => (
      <TouchableOpacity style={ style.conversationItem } key={ key }>
        <View>
          <Text style={ style.conversationItemText }>{ value.startQuestion }</Text>
          <Text>{ value.description.substring(0, 300) }</Text>
        </View>
      </TouchableOpacity>
    ));

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Mentoring Q&A'
            isModalScreen = { true }
            buttons = { headerButton }
            navigation =  { this.props.navigation }
          />
          <View style = {{ flex: 1 }}>
            <Search ref="search_box"
              backgroundColor='#fff'
              placeholderTextColor="#666"
              titleCancelColor="#666"
              tintColorSearch="#2cacd1"
              inputBorderRadius={50}
              inputStyle={style.input}
              onSearch={ value => { this.onSearch(value) }}
              onCancel={ () => { this.onCancel() } } />
            { questionList }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps, {})(QA);
