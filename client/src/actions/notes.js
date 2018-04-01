import { GET_NOTES, ADD_NOTE, EDIT_NOTE, REMOVE_NOTE } from './types';

export const getNotes = () => async dispatch => {
  const res = await fetch('/api/notes', {
    method: 'GET',
    credentials: 'same-origin'
  });
  const notes = await res.json();

  dispatch({ type: GET_NOTES, notes });
};

// ADD_NOTE

export const addNote = data => async dispatch => {
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  const res = await fetch('/api/notes', fetchData);
  const note = await res.json();

  dispatch({ type: ADD_NOTE, note });
};

// EDIT_NOTE

export const editNote = data => async dispatch => {
  const fetchData = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  const res = await fetch('/api/notes', fetchData);
  const update = await res.json();
  const note = {
    ...update,
    ...data
  };

  dispatch({ type: EDIT_NOTE, note });
};

// REMOVE_NOTE

export const removeNote = id => async dispatch => {
  try {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    });
    await res.json();

    dispatch({ type: REMOVE_NOTE, _id: id });
  } catch (error) {
    console.log('------------------------------------');
    console.log(error);
    console.log('------------------------------------');
  }
};
