import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import UserReducer from './UserReducer';
import QuestionReducer from './QuestionReducer';

// Combine here all reducers
const AppReducer = combineReducers({
  firebase: firebaseReducer,
  nav: NavReducer,
  user: UserReducer,
  question: QuestionReducer,
});

export default AppReducer;
