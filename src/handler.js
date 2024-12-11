const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
};

const getNoteHandler = (req, h) => {
  const { noteId } = req.params;
  const note = notes.filter((note) => note.id == noteId)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateNoteHandler = (req, h) => {
  const { noteId } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id == noteId);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    return {
      status: 'success',
      message: 'Catatan berhasil diperbaharui'
    };
  }

  h.code(404);
  return {
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan'
  };
};

const deleteNoteHandler = (req, h) => {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id == noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }

  const request = h.request({
    'status': 'fail',
    'message': 'Catatan gagal dihapus. Id catatan tidak ditemukan',
  });
  request.code(404);
  return request;
};

// const arr = [{ id: 1 }, 5];
// const arr2 = arr.filter((arr)=> arr.id == 1)[];
// let obj = { name: 'dibi', age: '20', school: 20 };
// // const arr = [1,3];
// // const ar = arr.findIndex((index)=>index==2);
// const name = 'agus';
// const age = 18;
// const name2 = 'fitri';
// obj = {
//   age,
//   name,
//   ...obj,
//   name2
// };
// console.log(obj);

module.exports = { addNoteHandler, getAllNotesHandler, getNoteHandler, updateNoteHandler, deleteNoteHandler };