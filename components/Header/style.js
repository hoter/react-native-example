import createStyles from '../../styles';
import { colors, fonts } from '../../styles/base';

export default createStyles({
  header: {
    height: 45,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.base,
    fontSize: fonts.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
