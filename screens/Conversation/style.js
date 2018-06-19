import { Image } from 'react-native';
import { padding, fonts } from '../../styles/base';
import createStyles from '../../styles/index';

export default createStyles({
  conversationItem: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingTop: padding.md,
    paddingBottom: padding.md,
  },
  conversationItemText: {
    color: '#666',
    fontSize: fonts.md - 2,
    fontWeight: 'bold',
  },
  input: {
    borderColor: "#2cacd1",
    borderWidth: 1,
  },
});
