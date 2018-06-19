import { Image } from 'react-native';
import createStyles from '../../../styles/index';
import { colors, fonts, padding } from '../../../styles/base';

export default createStyles({
  menuItem: {
    flexDirection: 'row',
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemWrapText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontWeight: '600',
    marginRight: 5,
    color: colors.darkGray,
  },
  menuItemText: {
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: fonts.md - 3,
  },
  menuItemLogo: {
    width: 28,
    height: 28,
    resizeMode: Image.resizeMode.contain,
    marginLeft: 5,
  },
  menuItemIcon: {
    color: colors.darkGray,
    textAlign: 'right',
    fontSize: fonts.lg,
    fontWeight: 'bold',
  }
});
