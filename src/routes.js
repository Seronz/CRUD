const {
  addNoteHandler,
  getAllNoteshandler,
  getNoteByHandler,
  editNoteByHandler,
  deleteNoteHandler,
} = require("./handler");

const routes = [
  {
    path: "/notes",
    method: "POST",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNoteshandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByHandler,
  },
  { method: "PUT", path: "/notes/{id}", handler: editNoteByHandler },
  { method: "DELETE", path: "/notes/{id}", handler: deleteNoteHandler },
];

module.exports = routes;
