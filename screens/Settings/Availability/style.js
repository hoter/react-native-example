import { Image } from 'react-native';
import { fonts, colors, padding } from '../../../styles/base';
import createStyles from '../../../styles/index';


export default createStyles({
  text: {
    color: colors.darkGray,
    fontSize: fonts.sm,
  },
  formWrapp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    flex: 0,
    width: 120,
  },
  form: {
    flex: 1,
  },
  selectDay: {
    borderWidth: 1,
    borderColor: colors.base,
    height: 30,
  }
});
