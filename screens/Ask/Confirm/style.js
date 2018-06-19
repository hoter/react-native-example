import { Image, PixelRatio } from 'react-native';
import { colors, fonts, padding } from '../../../styles/base';
import createStyles from '../../../styles';

export default createStyles({
  view: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    paddingBottom: padding.sm,
  },
  chooseCategory: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: 30,
  },
  chooseCategoryText: {
    fontSize: fonts.sm,
  },
  label: {
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: fonts.md - 2,
    marginBottom: 0,
    paddingTop: padding.sm,
    marginTop: 0,
  },
  question: {
    fontSize: fonts.md - 3,
    fontWeight: 'bold',
    color: colors.darkGray
  },
  description: {
    fontSize: fonts.md - 3,
    color: colors.lightGray
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
  },
  addToListButton: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: colors.base,
    padding: padding.sm - 5,
    width: 150,
  },
  addToListText: {
    fontSize: fonts.sm + 2,
    color: colors.base,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
