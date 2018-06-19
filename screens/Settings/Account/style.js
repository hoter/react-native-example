
import createStyles from '../../../styles';
import { fonts, colors, padding } from '../../../styles/base';

export default createStyles({
  settingsInput: {
    marginTop: 0,
    fontWeight: 'normal',
    fontSize: fonts.sm + 2,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#E6E5ED',
    marginBottom: padding.sm,
  },
  settingsInputMulti: {
    height: 100,
    textAlignVertical: 'top',
    padding: 5,
  },
  settingsInputSingle: {
    height: 30,
    paddingVertical: padding.sm - 5,
  },
  saveButton: {
    height: 30,
    width:100,
    flex: 1, 
    borderRadius: 3, 
    borderWidth: 1, 
    borderColor: colors.base, 
    justifyContent: 'center', 
    marginTop: 15,
  },
  saveButtonText: {
    textAlign: 'center', 
    color: colors.base, 
    fontSize: 12
  },
})