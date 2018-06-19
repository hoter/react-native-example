import { Image } from 'react-native';
import createStyles from '../../styles';
import { colors, fonts, padding } from '../../styles/base';

export default createStyles({
  appointment: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
  },
  appointmentDate: {
    fontSize: fonts.md - 1,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#444',
  },
  appointmentDuration: {
    fontWeight: 'bold',
    fontSize: fonts.sm + 1,
    color: '#666',
  },
  appointmentDescription: {
    color: '#666',
    fontSize: fonts.sm + 1,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: Image.resizeMode.contain,
  }
});
