import { Image, PixelRatio } from 'react-native';
import { colors, fonts, padding } from '../../../styles/base';
import createStyles from '../../../styles';

export default createStyles({
  submitButton: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: colors.base,
    padding: padding.sm - 5,
  },
  submitButtonText: {
    fontSize: fonts.sm + 2,
    color: colors.base,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addMoreAdvisorsButton: {
    flexDirection: 'row',
    marginTop: 20,
  },
  addMoreAdvisorsButtonText: {
    fontSize: fonts.sm + 2,
    color: colors.base,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.base,
    marginLeft: 10,
    marginTop: 5,
  },
  addMoreAdvisorsButtonImage: {
    width: 28,
    height: 28,
    resizeMode: Image.resizeMode.contain,
  },
});
