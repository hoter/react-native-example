import { Image } from 'react-native';
import createStyles from '../../styles';
import { colors, fonts } from '../../styles/base';

export default createStyles({
  userId: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    height: 30,
  },
  userIdLabel: {
    color: '#777',
    fontSize: fonts.md - 2,
    marginLeft: 10,
    paddingTop: 6,
  },
  userIdImage: {
    width: 28,
    height: 28,
    resizeMode: Image.resizeMode.contain,
  }
});
