import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import style from '../style';

class ConversationList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      appointments: 0,
    };
  }

  render() {
    if (!isLoaded(this.props.questions)) {
      return <Text>Loading...</Text>;
    }
    const qaCount = isEmpty(this.props.questions) ? 0 : Object.values(this.props.questions).length;

    return (
      <View style = {{ flex: 1 }}>
        <TouchableOpacity style={ style.conversationItem }>
          <View>
            <Text style={ style.conversationItemText }>Mentoring Appointments (0)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={ style.conversationItem } onPress={() => !isEmpty(this.props.questions) && this.props.navigation.navigate('QA', {
          questions: this.props.questions,
        })}>
          <View>
            <Text style={ style.conversationItemText }>Mentoring Q&A ({ qaCount })</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

  }
}

const mapStateToProps = state => {
  return {
    questions: state.firebase.data.questions,
  };
}

export default compose(
  firebaseConnect((props) => ([
    {
      path: 'questions',
      queryParams: ['orderByChild=uid', `equalTo=${props.auth.uid}`]
    }
  ])),
  connect(mapStateToProps)
)(ConversationList);
