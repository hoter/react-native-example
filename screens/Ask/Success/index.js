import React from 'react';
import { View, Text, Image, Switch } from 'react-native';

import Header from '../../../components/Header';
import CustomButton from '../../../components/ui/CustomButton';

import createStyles from '../../../styles';
import { colors, fonts, padding } from '../../../styles/base';

export default class SuccessAskScreen extends React.Component {
  static navigationOptions = {
    title: 'What Happens Now',
  };

  constructor (props) {
    super(props);
  }

  render () {
    const style = createStyles({});
    return (
      <View style = { style.container }>
        <View style = { style.content }>
          <Header
            title = 'Ask Advisors'
            isModalScreen = { true }
            navigation =  { this.props.navigation }
          />
          <View style = {{ padding: 30, paddingLeft: 50, paddingRight: 50  }}>
            <Text style = {{
              marginBottom: 15,
              fontSize: fonts.sm + 1,
              textAlign: 'center',  }}>Your question will be sent to the list of career Advisors you have chosen</Text>
            <Text style = {{
              marginBottom: 15,
              fontSize: fonts.sm + 1,
              textAlign: 'center',  }}>Some might reply shortly.</Text>
            <Text style = {{
              marginBottom: 15,
              fontSize: fonts.sm + 1,
              textAlign: 'center',  }}>Some might decline to answer if the do not have anything valuable to say.</Text>
            <Text style = {{
              marginBottom: 15,
              fontSize: fonts.sm + 1,
              textAlign: 'center',  }}>Some might not be able to answer intime</Text>
            <Text style = {{
              marginBottom: 15,
              fontSize: fonts.sm + 1,
              textAlign: 'center',  }}>You will be notified once on answer is received.</Text>
          </View>
          <View style = {{ marginTop: 15, alignItems: 'center', }}>
            <CustomButton
              style = {{
                borderWidth: 2,
                borderRadius: 3,
                borderColor: colors.base,
                padding: padding.sm - 5,
                width: 150,
              }}
              textStyle = {{
                fontSize: fonts.sm + 1,
                color: colors.base,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
              text = 'Got It'
              onPress = { () => this.props.navigation.navigate('Main') }
            />
          </View>
        </View>
      </View>
    );
  }
}
