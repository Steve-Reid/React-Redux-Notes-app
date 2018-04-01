import { SELECT_NOTE_ID, SET_TEXT_FILTER, TOGGLE_LIST } from './types';

export const selectNoteId = (id = null) => ({
  type: SELECT_NOTE_ID,
  id
});

export const setTextFilter = (text = '') => ({
  type: SET_TEXT_FILTER,
  text
});

export const toggleList = () => ({
  type: TOGGLE_LIST
});
