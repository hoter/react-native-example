import { Image } from 'react-native';
import { colors, fonts, padding } from '../../styles/base';
import createStyles from '../../styles';

export default createStyles({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 72,
    height: 72,
    resizeMode: Image.resizeMode.contain,
  },
  name: {
    textAlign: 'center',
    color: colors.darkGray,
    marginTop: 5,
    fontSize: fonts.md - 4,
    fontWeight: 'bold',
  }
})
