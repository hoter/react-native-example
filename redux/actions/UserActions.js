export const userLogin = (type) => {
  return {
    type: 'USER_LOGIN',
    payload: type,
  };
};

export const loadAdvisors = (type) => {
  return {
    type: 'LOAD_ADVISORS',
    payload: type,
  };
};

export const editUserAudioSettings = (type) => {
  return {
    type: 'EDIT_USER_AUDIO_SETTINGS',
    payload: type,
  };
};

export const editUserVideoSettings = (type) => {
  return {
    type: 'EDIT_USER_VIDEO_SETTINGS',
    payload: type,
  };
};

export const editFirstName = (type) => {
  return {
    type: 'EDIT_FIRST_NAME',
    payload: type,
  };
};

export const editLastName = (type) => {
  return {
    type: 'EDIT_LAST_NAME',
    payload: type,
  };
};

export const editTimeZone = (type) => {
  return {
    type: 'EDIT_TIME_ZONE',
    payload: type,
  };
};

export const editSummary = (type) => {
  return {
    type: 'EDIT_SUMMARY',
    payload: type,
  };
};

export const editJob = (type) => {
  return {
    type: 'EDIT_JOB',
    payload: type,
  };
};

export const editJobResp = (type) => {
  return {
    type: 'EDIT_JOB_RESP',
    payload: type,
  };
};

export const editOverview = (type) => {
  return {
    type: 'EDIT_OVERVIEW',
    payload: type,
  };
};

export const editLinkedinProfile = (type) => {
  return {
    type: 'EDIT_LINKEDIN_PROFILE',
    payload: type,
  };
};

export const addKeyword = (type) => {
  return {
    type: 'ADD_KEYWORD',
    payload: type,
  };
};

export const removeKeyword = (type) => {
  return {
    type: 'REMOVE_KEYWORD',
    payload: type,
  };
};

export const addConnection = (type) => {
  return {
    type: 'ADD_CONNECTION',
    payload: type,
  };
};

export const changeAvailability = (type) => {
  return {
    type: 'CHANGE_AVAILABILITY',
    payload: type,
  };
};

export const changeBook = (type) => {
  return {
    type: 'CHANGE_BOOK',
    payload: type,
  };
};