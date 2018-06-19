import React from 'react';
import { View, Text, Image, Switch } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import { colors, fonts } from '../../../styles/base';

import { saveQuestion, setQuestionParam } from '../../../redux/actions/QuestionAction';

import Header from '../../../components/Header';
import UserId from '../../../components/UserId';
import CustomButton from '../../../components/ui/CustomButton';
import AdvisorPrevew from '../../../components/AdvisorPreview';

import style from './style';

class AskConfirmScreen extends React.Component {
  static navigationOptions = {
    title: 'Ask Advisors',
  };

  constructor (props) {
    super(props);

    this.state = {
      hideIdentity: this.props.question.hideIdentity,
    };
  }

  pushQuestion () {
    firebase.push(`questions`, this.props.question);

    this.props.navigation.navigate('AskSuccess')
  }

  getSelectedUserProfiels () {
    const selectedIds = this.props.question.selectedAdvisors;
    const allAdvisors = this.props.loadedAdvisors;
    const advisors = allAdvisors.filter(
      advisor => selectedIds.some(id => {
        return advisor.key === id
      })
    );

    return advisors;
  }

  render () {
    const color = this.state.hideIdentity ? colors.base : '#777';
    const text = this.state.hideIdentity ? 'ON' : 'OFF';
    const nickname = this.props.question.hideIdentity
      ? 'anonymous'
      : this.props.user.firstName + ' ' + (this.props.user.lastName ? this.props.user.lastName.charAt(0) + '.' : '');

    const advisors = this.getSelectedUserProfiels();

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Ask Advisor'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
            disableBack = { true }
          />
          <View style = {{ flex: 1 }}>
            <Text style = { style.label }>From:</Text>
            <View style = {[ { height: 50, paddingTop: 10, justifyContent: 'center', flexDirection: 'row', }, style.view]}>
              <UserId id = { nickname } />
              <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 20 }}>
                <Switch
                  value = { this.props.question.hideIdentity }
                  onValueChange = {
                    (hideIdentity) => {
                        this.props.setQuestionParam({ param: 'hideIdentity', value: hideIdentity });
                        this.setState({ hideIdentity: hideIdentity });
                      }
                    }
                  onTintColor = { color }
                  thumbTintColor = { color }
                />
                <CustomButton
                  onPress = { () => { this.props.setQuestionParam({ param: 'hideIdentity', value: !this.props.question.hideIdentity }) } }
                  text = { `Hide My Identity: ${text}` }
                  textStyle = {{ color: color, fontSize: fonts.md - 2 }}
                  style = {{ marginTop: 5, marginLeft: 3 }} />
              </View>
            </View>

            <View style = { style.view }>
              <View>
                <Text style = { style.label }>To:</Text>
              </View>
              <View>
                <AdvisorPrevew
                  advisors = { advisors }
                />
              </View>
            </View>

            <View style = { style.view }>
              <Text style = { style.label }>My Question:</Text>
              <Text stlye = { style.question }>{ this.props.question.situation }</Text>
              <Text stlye = { style.description }>{ this.props.question.description }</Text>
            </View>
          </View>

          <View style = {{ position: 'absolute', bottom: 20, left: 10, right: 10, alignItems: 'center', }}>
            <CustomButton
              style = { style.addToListButton }
              textStyle = { style.addToListText }
              text = 'Send'
              onPress = { () => this.pushQuestion() }
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    question: state.question,
    loadedAdvisors: state.user.loadedAdvisors
  };
}

export default connect(mapStateToProps, {
  saveQuestion,
  setQuestionParam,
})(AskConfirmScreen);
