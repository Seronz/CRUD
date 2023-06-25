const { nanoid } = require("nanoid");
const notes = require("./notes");
const { update } = require("lodash");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  createdAt = new Date().toISOString();
  updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);
  /* Kode di bawah ini digunakan untuk menentukan apakah newNote 
sudah masuk kedalam array note
    kita memanfaatkan method filter() berdasarkan id untuk mengetahuinya
    
    kita juga menggunakan isSuccess untuk menentukan response yang diberikan server.
jika isSuccess bernilai true, maka diberi respon berhasil,
jika isSuccess bernilai false, maka beri respon gagal  */
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "failure",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

/*
Documentation 

    nilai title, tags, dan body di isi oleh client
    properti id di isi oleh nanoid

    properti createAt dan updateAt, karena dalam
kasus ini nilai keduanya adalah sama maka akan secara 
mudah kita memberikan nilai new Date().toISOString()

    kita gunakan method push untuk memasukkan nilai-nilai 
kedalam array notes
*/

const getAllNoteshandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: { note },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal didapatan",
  });
  response.code(404);
  return response;
};

const editNoteByHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
    const response = h.response({
      status: "success",
      message: "Berhasil memperbarui notes",
    });
    response.code(200);
    return response;
  }
  /*Spread oprator pada kode di atas digunakan untuk mempertahankan
nilai notes[index]*/

  const response = h.response({
    status: "fail",
    message: "Gagal merubah catatan",
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const id = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    index.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus",
  });
  response.code(404);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNoteshandler,
  getNoteByHandler,
  editNoteByHandler,
  deleteNoteHandler,
};
