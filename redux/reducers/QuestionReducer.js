import { QUESTION } from '../state/QuestionState';

const QuestionReducer = (state = QUESTION, action) => {
  switch (action.type) {
    case 'SAVE_QUESTION':
      return {...state, question: action.payload };
    case 'SET_QUESTION_PARAM':
      const payload = action.payload;
      state[payload.param] = payload.value;

      return state;
    default:
      return state;
  }
};

export default QuestionReducer;
