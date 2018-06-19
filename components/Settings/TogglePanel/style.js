import createStyles from '../../../styles';
import { colors, fonts, padding } from '../../../styles/base';

export default createStyles({
  togglePanel: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  togglePanelBtn: {
    paddingTop: padding.md,
    paddingBottom: padding.md,
  },
  togglePanelLabel: {
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: fonts.md - 3,
  },
  togglePanelIcon: {
    color: colors.darkGray,
    textAlign: 'right',
    fontSize: fonts.lg,
    fontWeight: 'bold',
  },
  togglePanelContent: {
    paddingBottom: 5,
  }
});
