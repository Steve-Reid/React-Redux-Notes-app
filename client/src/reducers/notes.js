import { GET_NOTES, ADD_NOTE, EDIT_NOTE, REMOVE_NOTE } from '../actions/types';

const notesReducerDefaultState = [];

export default (state = notesReducerDefaultState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return action.notes;
    case ADD_NOTE:
      return [...state, action.note];
    case EDIT_NOTE:
      return state.map(note => {
        if (note._id === action.note._id) {
          return {
            ...note,
            ...action.note
          };
        } else {
          return note;
        }
      });
    case REMOVE_NOTE:
      return state.filter(({ _id }) => _id !== action._id);
    default:
      return state;
  }
};
