import React from 'react';
import { View, Text, Image, ScrollView, FlatList, Switch, Picker, TextInput } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { colors, fonts } from '../../styles/base';

import { saveQuestion, setQuestionParam } from '../../redux/actions/QuestionAction';

import Header from '../../components/Header';
import UserId from '../../components/UserId';
import CustomButton from '../../components/ui/CustomButton';
import ChooseCategory from '../../components/ChooseCategory';

import style from './style';

class AskAdvisorsScreen extends React.Component {
  static navigationOptions = {
    title: 'Ask Advisors',
  };

  constructor (props) {
    super(props);

    this.state = {
      question: {
        hideIdentity: false,
        category: null,
        description: '',
        situation: '',
        context: '',
        attachments: []
      },
      chooseCategory: '',
    };
  }

  pickFile () {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      console.log(res);
    });
  }

  valueChange = (itemValue) => {
    this.props.setQuestionParam({ param: 'category', value: itemValue });
    let question = this.props.question;
    this.setState({ question: question });
  }

  validateText (text) {
    return text && text.length > 0;
  }

  saveQuestion () {
    const uid = this.props.user.uid;
    const isDescValidated = this.validateText(this.props.question.description);
    const isQuestionValidated = this.validateText(this.props.question.situation);

    if (this.props.question.category !== null && isDescValidated && isQuestionValidated) {
      this.props.setQuestionParam({ param: 'uid', value: uid });
      this.props.navigation.navigate('AdvisorsList');
    } else {
      alert('Please fill `Category`, `Description` and `Situation` fields');
    }
  }

  render () {
    let color = this.props.question.hideIdentity ? colors.base : '#777';
    let text = this.props.question.hideIdentity ? 'ON' : 'OFF';
    const nickname = this.props.question.hideIdentity
      ? 'anonymous'
      : this.props.user.firstName + ' ' + (this.props.user.lastName ? this.props.user.lastName.charAt(0) + '.' : '');

    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Ask Advisors'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <View style = {{ flex: 1 }}>
            <View style = {{ height: 50, paddingTop: 10, justifyContent: 'center', flexDirection: 'row', }}>
              <UserId id = { nickname } />
              <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Switch
                  value = { this.state.question.hideIdentity }
                  onValueChange = {
                    (hideIdentity) => {
                      this.props.setQuestionParam({ param: 'hideIdentity', value: hideIdentity });
                      let question = this.props.question;
                      this.setState({ question: question });
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

            <View>
              <ChooseCategory valueChange={this.valueChange}/>

              <View>
                <TextInput
                  style = {[ style.textInputStyleBig ]}
                  underlineColorAndroid = 'rgba(0, 0, 0, 0)'
                  placeholder='Describe the issue or challenge briefly'
                  onChangeText = {
                    (text) => {
                      this.props.setQuestionParam({ param: 'description', value: text })
                    }
                  }
                />
                <TextInput
                  placeholderTextColor = { colors.lightGray }
                  selectionColor = { colors.lightGray }
                  underlineColorAndroid = { colors.lightGray }
                  style = {[ style.textInputStyle ]}
                  placeholder='start you question with a detailed description of your'
                  onChangeText = {
                    (text) => {
                      this.props.setQuestionParam({ param: 'startQuestion', value: text })
                    }
                  }
                />
                <TextInput
                  placeholderTextColor = { colors.lightGray }
                  selectionColor = { colors.lightGray }
                  underlineColorAndroid = { colors.lightGray }
                  style = {[ style.textInputStyle ]}
                  placeholder='situation, and background and any additional information'
                  onChangeText = {
                    (text) => {
                      this.props.setQuestionParam({ param: 'situation', value: text })
                    }
                  }
                />
                <TextInput
                  placeholderTextColor = { colors.lightGray }
                  selectionColor = { colors.lightGray }
                  underlineColorAndroid = { colors.lightGray }
                  style = {[ style.textInputStyle ]}
                  placeholder='context information you might have...'
                  onChangeText = {
                    (text) => {
                      this.props.setQuestionParam({ param: 'context', value: text })
                    }
                  }
                />
              </View>

              <View>
                <CustomButton
                  imageSource = { require('../../assets/images/icons/attachment.png') }
                  text = 'include a link or attachment that gives context.'
                  style = { style.fileUpload }
                  textStyle = { style.fileUploadText }
                  imageStyle = { style.fileUploadIcon }
                  onPress = { () => { this.pickFile() } }
                />
              </View>

              <View style = { style.submitWrapper }>
                <CustomButton
                  text = 'Ask a Advisor'
                  style = { style.submit }
                  textStyle = { style.submitText }
                  onPress = { () => { this.saveQuestion() } }
                />
              </View>
            </View>
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
  };
}

export default connect(mapStateToProps, {
  saveQuestion,
  setQuestionParam,
})(AskAdvisorsScreen);
