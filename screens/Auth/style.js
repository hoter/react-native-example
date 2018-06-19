import { Image } from 'react-native';
import createStyles from '../../styles/index';

import {
  colors,
  fonts,
  padding,
  gap } from '../../styles/base';

export default createStyles({
  logo: {
    width: 250,
    resizeMode: Image.resizeMode.contain,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    flex: 2,
    paddingTop: padding.xxl,
  },
  label: {
    fontSize: fonts.lg,
    fontWeight: 'bold',
    color: colors.base,
  },
  submit: {
    marginTop: gap.sm,
    width: 195,
  },
  signIn: {
    marginTop: gap.lg,
    width: 195,
  },
  signInText: {
    fontSize: fonts.sm,
    textAlign: 'center',
  },
  text: {
    width: 200,
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
  },
  btn: {
    borderColor: colors.base,
    padding: 50,
    paddingTop: padding.sm - 5,
    paddingBottom: padding.sm - 5,
    borderRadius: 4,
    borderWidth: 1,
  },
  btnText: {
    fontWeight: 'bold',
    color: colors.base,
    textAlign: 'center',
  },
});
