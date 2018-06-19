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
  textInputStyleBig: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    fontSize: fonts.md - 2,
    fontWeight: 'bold',
    height: 30,
    padding: 0,
    paddingLeft: padding.sm,
    marginTop: padding.sm,
    marginBottom: padding.sm,
  },
  textInputStyle: {
    fontSize: fonts.sm,
    paddingTop: 0,
    paddingBottom: padding.sm - 5,
    marginTop: 0,
  },
  fileUpload: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 45,
    marginTop: 5,
  },
  fileUploadText: {
    flex: 1,
    fontSize: fonts.md - 2,
    marginTop: 4,
    marginLeft: 5,
  },
  fileUploadIcon: {
    width: 28,
    height: 28,
    resizeMode: Image.resizeMode.contain,
  },
  submitWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: 150,
    paddingTop: padding.sm - 5,
    paddingBottom: padding.sm - 5,
    borderWidth: 2,
    borderColor: colors.base,
    borderRadius: 3,
  },
  submitText: {
    textAlign: 'center',
    fontSize: fonts.md - 2,
    fontWeight: 'bold',
    color: colors.base,
  }
});
