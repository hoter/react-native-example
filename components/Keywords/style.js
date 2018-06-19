import createStyles from '../../styles';
import { colors, fonts } from '../../styles/base';

export default createStyles({
  keywords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cKeyword: {
    backgroundColor: colors.lightGray,
    marginBottom: 5,
    marginRight: 5,
    padding: 5,
  },
  cKeywordText: {
    fontSize: fonts.sm + 2,
    color: colors.white,
  },
  keywordText: {
    fontSize: fonts.sm + 2,
    color: colors.white,
    padding: 5,
    marginBottom: 5,
    marginRight: 5,
    backgroundColor: colors.lightGray,
  }
});
