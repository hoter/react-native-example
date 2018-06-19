import { Image } from 'react-native';
import { colors, fonts, padding } from '../../styles/base';
import createStyles from '../../styles';

export default createStyles({
  wrapper: {
    padding: padding.sm,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 72,
    height: 72,
    resizeMode: Image.resizeMode.contain,
  },
  name: {
    textAlign: 'left',
    color: colors.darkGray,
    marginLeft: 15,
    fontSize: fonts.md - 4,
    fontWeight: 'bold',
  }
})
