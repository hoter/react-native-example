import { USER as initialState } from '../state/UserState';

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOAD_ADVISORS':
      return { ...state, loadedAdvisors: action.payload }
    case 'EDIT_USER_AUDIO_SETTINGS':
      state.currentUser.status.audio = action.payload;
      return state;
    case 'EDIT_USER_VIDEO_SETTINGS':
      state.currentUser.status.video = action.payload;
      return state;
    case 'EDIT_SUMMARY':
      state.currentUser.info.summary = action.payload;
      return state;
    case 'EDIT_JOB':
      state.currentUser.info.job = action.payload;
      return state;
    case 'EDIT_FIRST_NAME':
      state.currentUser.firstName = action.payload;
      return state;
    case 'EDIT_LAST_NAME':
      state.currentUser.lastName = action.payload;
      return state;
    case 'EDIT_TIME_ZONE':
      state.currentUser.info.timeZone = action.payload;
      return state;
    case 'EDIT_JOB_RESP':
      state.currentUser.info.jobResp = action.payload;
      return state;
    case 'EDIT_OVERVIEW':
      state.currentUser.info.overview = action.payload;
      return state;
    case 'EDIT_LINKEDIN_PROFILE':
      state.currentUser.info.linkedin = action.payload;
      return state;
    case 'ADD_KEYWORD':
      state.currentUser.info.keyword = state.currentUser.info.keyword || [];
      if (state.currentUser.info.keyword.indexOf(action.payload) === -1) {
        state.currentUser.info.keyword.push(action.payload);
      }
      return state;
    case 'REMOVE_KEYWORD':
      const newKeyword = state.currentUser.info.keyword.filter(el => el !== action.payload);
      state.currentUser.info.keyword = newKeyword;
      return state;
    case 'ADD_CONNECTION':
      state.currentUser.connections = state.currentUser.connections || [];
      state.currentUser.connections.concat(action.payload);
      return state;
    case 'CHANGE_AVAILABILITY':
      state.currentUser.availability = action.payload;
      return state;
    case 'CHANGE_BOOK':
      state.currentUser.book = action.payload;
      return state;
    break;
    default:
      return state;
  }
};

export default UserReducer;
