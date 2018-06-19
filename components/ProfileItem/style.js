import { Image } from 'react-native';
import createStyles from '../../styles';
import { colors, fonts, padding } from '../../styles/base';

export default createStyles({
  userItem: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
    flexDirection: 'row',
    minHeight: 84,
  },
  userItemImageWrapper: {
    width: 64,
    height: 64,
  },
  userItemImage: {
    width: 64,
    height: 64,
    resizeMode: Image.resizeMode.contain,
  },
  userItemInfo: {
    flex: 1,
    paddingLeft: padding.md,
    paddingRight: padding.md,
  },
  userItemName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: fonts.md - 2,
    marginBottom: 10,
  },
  userItemDesc: {
    marginTop: 5,
    color: colors.lightGray,
    fontSize: fonts.sm + 1,
    paddingTop: 0,
    marginTop: -2,
  }
});