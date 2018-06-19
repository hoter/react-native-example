import { Image } from 'react-native';
import { fonts, colors, padding } from '../../styles/base';
import createStyles from '../../styles/index';


export default createStyles({
  text: {
    color: colors.darkGray,
    fontSize: fonts.sm,
  },
  addToListButton: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: colors.base,
    padding: padding.sm - 5,
  },
  addToListText: {
    fontSize: fonts.sm + 2,
    color: colors.base,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
