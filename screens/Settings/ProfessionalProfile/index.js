import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';

import firebase from 'firebase';
import { firebaseConnect } from 'react-redux-firebase';

import Header from '../../../components/Header';
import TogglePanel from '../../../components/Settings/TogglePanel';
import Keywords from '../../../components/Keywords';
import ChooseCategory from '../../../components/ChooseCategory';

import { editSummary, editJob, editJobResp, editOverview, editLinkedinProfile, addKeyword, removeKeyword } from '../../../redux/actions/UserActions';

import { colors } from '../../../styles/base';
import style from './style';
import CustomButton from '../../../components/ui/CustomButton';

class ProfessionalProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      summary: this.props.currentUser.info.summary,
      job: this.props.currentUser.info.job,
      jobResp: this.props.currentUser.info.jobResp,
      overview: this.props.currentUser.info.overview,
      linkedin: this.props.currentUser.info.linkedin,
      keyword: this.props.currentUser.info.keyword || [],
      newKeyword: null,
      save: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return state;
  }

  editUserSummary(param) {
    this.props.editSummary(param);
    this.setState({ summary: param });
    this.setState({ save: false });
  }

  editUserJob(param) {
    this.props.editJob(param);
    this.setState({ job: param });
    this.setState({ save: false });
  }

  editUserJobResp(param) {
    this.props.editJobResp(param);
    this.setState({ jobResp: param });
    this.setState({ save: false });
  }

  editUserOverview(param) {
    this.props.editOverview(param);
    this.setState({ overview: param });
    this.setState({ save: false });
  }

  editUserLinkedin(param) {
    this.props.editLinkedin(param);
    this.setState({ linkedin: param });
    this.setState({ save: false });
  }

  valueChange = (itemValue) => {
    this.setState({ newKeyword: itemValue});
  }

  saveInfo() {
    firebase.update(`users/${this.props.currentUser.uid}`, { info: this.props.currentUser.info });
    this.props.navigation.navigate('Me');
  }

  addUserKeyword (keyword) {
    const keywords = this.state.keyword;
    const keywordEvery = keywords.every(value => value !== keyword);

    if (keyword) {
      if (keywordEvery) {
        const keywords = this.state.keyword;
        keywords.push(keyword);

        this.setState({ keyword: keywords });

        this.props.addKeyword(keyword);
      } else {
        alert('You have already selected the current keyword!');
      }
    }
  }

  removeKeyword (keyword) {
    if (keyword) {
      Alert.alert(
        'Remove keyword?',
        `Are you sure that you want to remove the '${keyword}'?`,
        [
          {
            text: 'Yes',
            onPress: () => {
              const keywords = this.state.keyword;
              const removed = keywords.filter(value => keyword !== value);

              this.setState({ keyword: removed });

              this.props.removeKeyword(keyword);
            }
          },
          {
            text: 'No'
          }
        ],
      );
    }
  }

  render () {
    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Professional Profile'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <ScrollView>
            <TogglePanel label = 'Summary'>
              <TextInput style = {[ style.settingsInput, style.settingsInputMulti ]}
                placeholder = 'Your Summary'
                multiline = { true }
                numberOfLines = { 5 }
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.summary }
                onChangeText = { (text) => this.editUserSummary(text) }
              />
            </TogglePanel>

            <TogglePanel label = 'Job title and responsibilites'>
              <TextInput style = {[ style.settingsInput, style.settingsInputSingle ]}
                placeholder = 'Job title'
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.job }
                onChangeText = { (text) => this.editUserJob(text) }
              />
              <TextInput style = {[ style.settingsInput, style.settingsInputMulti ]}
                placeholder = 'Your Responsibilites'
                multiline = { true }
                numberOfLines = { 5 }
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.jobResp }
                onChangeText = { (text) => this.editUserJobResp(text) }
              />
            </TogglePanel>
            <TogglePanel label = 'Expertise Overview'>
              <TextInput style = {[ style.settingsInput, style.settingsInputMulti ]}
                placeholder = 'Expertise Overview'
                multiline = { true }
                numberOfLines = { 5 }
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.overview }
                onChangeText = { (text) => this.editUserOverview(text) }
              />
            </TogglePanel>
            <TogglePanel label = 'Keywords'>
              <Keywords
                isClickable = { true }
                keywords = { this.state.keyword }
                onKeywordPress = { (keyword) => { this.removeKeyword(keyword) } }
              />
              <View style = {{ flexDirection: 'row', }}>

              <View style = {{ flex: 3, marginBottom: 10, }}>
                <ChooseCategory valueChange={this.valueChange}/>
              </View>

                <CustomButton
                  text = 'Add'
                  style = {{ height: 30, flex: 1, borderRadius: 3, borderWidth: 1, borderColor: colors.base, justifyContent: 'center', marginLeft: 15, }}
                  textStyle = {{ textAlign: 'center', color: colors.base, fontSize: 12 }}
                  onPress = { () => this.addUserKeyword(this.state.newKeyword) }
                />
              </View>
            </TogglePanel>
            <TogglePanel label = 'LinkedIn Profile'>
              <TextInput style = {[ style.settingsInput, style.settingsInputSingle ]}
                placeholder = 'LinkedIn Profile'
                underlineColorAndroid = { 'transparent' }
                selectionColor = { colors.base }
                value = { this.state.linkedin }
                onChangeText = { (text) => this.editUserlinkedin(text) }
              />
            </TogglePanel>
            <CustomButton
              text = 'Save'
              style = { style.saveButton }
              textStyle = { style.saveButtonText }
              onPress = { () => this.saveInfo() }
              disabled = { this.state.save }
            />
          </ScrollView>
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

function mapDispatchToProps(dispatch) {
  return {
    editSummary: bindActionCreators(editSummary, dispatch),
    editJob: bindActionCreators(editJob, dispatch),
    editJobResp: bindActionCreators(editJobResp, dispatch),
    editOverview: bindActionCreators(editOverview, dispatch),
    editLinkedinProfile: bindActionCreators(editLinkedinProfile, dispatch),
    addKeyword: bindActionCreators(addKeyword, dispatch),
    removeKeyword: bindActionCreators(removeKeyword, dispatch)
  }
}

export default compose(
  firebaseConnect([
    'users',
  ]),connect(mapStateToProps, {
    editSummary,
    editJob,
    editJobResp,
    editOverview,
    editLinkedinProfile,
    addKeyword,
    removeKeyword
  }))(ProfessionalProfile);
