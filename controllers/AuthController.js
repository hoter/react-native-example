import firebase from 'firebase';

const DEFAULT_USER_DATA = {
  firstName: '',
  lastName: '',
  info: {
    job: '',
    jobResp: '',
    overview: '',
    linkedin: null,
    keyword: [],
    summary: '',
    timeZone: '(GMT +0)',
  },
  status: {
    audio: true,
    video: false,
    duration: 30,
  },
  availability: {
    days:[],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
  book: {
    days:[],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
  areas: ['1'],
  connections: [],
};

function createNewUser (creds) {
  return firebase.createUser(creds, DEFAULT_USER_DATA);
}

function loginUser (creds) {
  return firebase.login(creds);
}

function signOut () {
  return firebase.logout();
}

export { createNewUser, loginUser, signOut };
