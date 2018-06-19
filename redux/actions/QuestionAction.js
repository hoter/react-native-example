export const saveQuestion = (type) => {
  return {
    type: 'SAVE_QUESTION',
    payload: type,
  };
};

export const setQuestionParam = (type) => {
  return {
    type: 'SET_QUESTION_PARAM',
    payload: type,
  };
};
