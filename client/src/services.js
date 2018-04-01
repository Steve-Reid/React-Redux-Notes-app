export const getNotes = async () => {
  const res = await fetch('/api/notes');
  const notes = await res.json();

  return notes;
};

export const getNote = async id => {
  const res = await fetch(`/api/notes/${id}`);
  const note = await res.json();

  return note;
};

export const saveNote = async (id, title, body) => {
  let fetchData = {};
  let data = {};

  if (id) {
    data = {
      id,
      title,
      body
    };
  } else {
    data = {
      title,
      body
    };
  }

  fetchData = {
    method: id ? 'PATCH' : 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const save = await fetch('/api/notes', fetchData);
    const res = await save.json();

    return res;
  } catch (err) {
    console.log('------------------------------------');
    console.log('err: ', err);
    console.log('------------------------------------');
  }

  return;
};
