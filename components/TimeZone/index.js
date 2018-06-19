import React from 'react';
import { View, Picker } from 'react-native';

import style from './style';

export default class TimeZone extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      chooseTimeZone: this.props.timeZone,
    }
  }
  
  render () {

    const timeZoneArr = [
      {
        label: "(GMT -12:00) Eniwetok, Kwajalein",
        value: "(GMT -12:00)"
      },
      {
        label:"(GMT -11:00) Midway Island, Samoa",
        value: "(GMT -11:00)"
      },
      {
        label:"(GMT -10:00) Hawaii",
        value: "(GMT -10:00)"
      },
      {
        label:"(GMT -9:00) Alaska",
        value: "(GMT -9:00)"
      },
      {
        label:"(GMT -8:00) Pacific Time (US &amp; Canada)",
        value: "(GMT -8:00)"
      },
      {
        label:"(GMT -7:00) Mountain Time (US &amp; Canada)",
        value: "(GMT -7:00)"
      },
      {
        label:"(GMT -6:00) Central Time (US &amp; Canada), Mexico City",
        value: "(GMT -6:00)"
      },
      {
        label:"(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima",
        value: "(GMT -5:00)"
      },
      {
        label:"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
        value: "(GMT -4:00)"
      },
      {
        label:"(GMT -3:30) Newfoundland",
        value: "(GMT -3:30)"
      },
      {
        label:"(GMT -3:00) Brazil, Buenos Aires, Georgetown",
        value: "(GMT -3:00)"
      },
      {
        label:"(GMT -2:00) Mid-Atlantic",
        value: "(GMT -2:00)"
      },
      {
        label:"(GMT -1:00 hour) Azores, Cape Verde Islands",
        value: "(GMT -1:00 hour)"
      },
      {
        label:"(GMT +0) Western Europe Time, London, Lisbon, Casablanca",
        value: "(GMT +0)"
      },
      {
        label:"(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris",
        value: "(GMT +1:00 hour)"
      },
      {
        label:"(GMT +2:00) Kaliningrad, South Africa",
        value: "(GMT +2:00)"
      },
      {
        label:"(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
        value: "(GMT +3:00)"
      },
      {
        label:"(GMT +3:30) Tehran",
        value: "(GMT +3:30)"
      },
      {
        label:"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
        value: "(GMT +4:00)"
      },
      {
        label:"(GMT +4:30) Kabul",
        value: "(GMT +4:30)"
      },
      {
        label:"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
        value: "(GMT +5:00)"
      },
      {
        label:"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
        value: "(GMT +5:30)"
      },
      {
        label:"(GMT +5:45) Kathmandu",
        value: "(GMT +5:45)"
      },
      {
        label:"(GMT +6:00) Almaty, Dhaka, Colombo",
        value: "(GMT +6:00)"
      },
      {
        label:"(GMT +7:00) Bangkok, Hanoi, Jakarta",
        value: "(GMT +7:00)"
      },
      {
        label:"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
        value: "(GMT +8:00)"
      },
      {
        label:"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
        value: "(GMT +9:00)"
      },
      {
        label:"(GMT +9:30) Adelaide, Darwin",
        value: "(GMT +9:30)"
      },
      {
        label:"(GMT +10:00) Eastern Australia, Guam, Vladivostok",
        value: "(GMT +10:00)"
      },
      {
        label:"(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
        value: "(GMT +11:00)"
      },
      {
        label:"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
        value: "(GMT +12:00)"
      },
    ];

    const timeZone = timeZoneArr.map(
      (value, i) => (
        <Picker.Item label={ value.label } value={ value.value } key={ i+1 }/>
      )
    );
    
    return (
      <View style = { style.chooseCategory }>
        <Picker 
          selectedValue = { this.state.chooseTimeZone }
          onValueChange={
            (itemValue, itemIndex) => {
              this.setState({chooseTimeZone: itemValue});
              this.props.valueChange(itemValue);
            }
          }
          style = {{ color: '#555', height: 30, }}>
          { timeZone }
        </Picker>
      </View>
    );
  }
}


