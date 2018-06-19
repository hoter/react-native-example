import { Image, PixelRatio } from 'react-native';
import { colors, fonts, padding } from '../../styles/base';
import createStyles from '../../styles';

export default createStyles({
  chooseCategory: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: 30,
  },
  chooseCategoryText: {
    fontSize: fonts.sm,
  },
  timeButton: {
    flex: 0, 
    padding: 10, 
    width: 100, 
    height: 38,
    borderWidth: 1, 
    borderColor: colors.base, 
    marginBottom: 15
  },
  timeButtonFree: {
    opacity: 0.5
  },
  timeButtonBook: {
    backgroundColor: colors.base,
  },
  timeButtonText: {
    color: colors.base,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fonts.md - 3
  },

});
