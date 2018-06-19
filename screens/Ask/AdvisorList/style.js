import { Image, PixelRatio } from 'react-native';
import { colors, fonts, padding } from '../../../styles/base';
import createStyles from '../../../styles';

export default createStyles({
  fill: {
    paddingTop: padding.md,
    paddingBottom: padding.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillTextButton: {
    color: colors.base,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.base,
    fontWeight: 'bold',
  },
  fillText: {
    textAlign: 'center',
  }
});
