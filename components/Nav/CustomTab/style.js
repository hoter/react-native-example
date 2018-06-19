import { Image } from 'react-native';
import createStyles from '../../../styles/index';
import { colors, fonts } from '../../../styles/base';

export default createStyles({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    bottom: 0,
    left: 15,
    right: 15,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 20,
    zIndex: 99,
  },
  activeTintColor: {
    color: colors.base
  },
  tab: {
    position: 'relative',
    width: 80,
    borderWidth: 0,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabInner: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.base,
    textAlign: 'center',
  },
  inactiveTintColor: {
    color: '#444',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: Image.resizeMode.contain,
  }
});