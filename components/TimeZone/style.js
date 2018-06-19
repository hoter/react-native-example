import { Image, PixelRatio } from 'react-native';
import { colors, fonts, padding } from '../../styles/base';
import createStyles from '../../styles';

export default createStyles({
  chooseCategory: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: 30,
  },
  chooseCategoryText: {
    fontSize: fonts.sm,
  },
});
