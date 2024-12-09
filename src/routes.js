const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{noteId}',
    handler: getNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{noteId}',
    handler: updateNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{noteId}',
    handler: deleteNoteHandler,
  },
];

module.exports = routes;