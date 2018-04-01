import { SELECT_NOTE_ID, SET_TEXT_FILTER, TOGGLE_LIST } from '../actions/types';

const filterReducerDefaultState = {
  id: null,
  text: '',
  isListOpen: false,
};

export default (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case SELECT_NOTE_ID:
      return {
        ...state,
        id: action.id
      };
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case TOGGLE_LIST:
      return {
        ...state,
        isListOpen: !state.isListOpen
      };
    default:
      return state;
  }
};
