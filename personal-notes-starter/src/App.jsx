import React, { useState } from 'react';
import './styles/style.css';
import { getInitialData, showFormattedDate } from './data';

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [search, setSearch] = useState('');

  const addNote = () => {
    const newNoteData = {
      id: +new Date(),
      title: newNote.title,
      body: newNote.body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setNotes([newNoteData, ...notes]);
    setNewNote({ title: '', body: '' });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      )
    );
  };

  const unarchiveNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: false } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) && !note.archived
  );

  const archivedNotes = notes.filter((note) => note.archived);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setNewNote({ ...newNote, title: value });
    }
  };

  return (
    <div className="note-app__body">
      {/* Header dengan Pencarian di kanan */}
      <div className="note-app__header">
        <h1>Aplikasi Catatan</h1>
        <input
          type="text"
          placeholder="Cari Catatan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="note-search"
        />
      </div>

      {/* Input Catatan */}
      <div className="note-input">
        <input
          type="text"
          placeholder="Judul Catatan (max 50 karakter)"
          value={newNote.title}
          onChange={handleTitleChange}
        />
        <div className="note-input__title__char-limit">
          Sisa karakter: {50 - newNote.title.length}
        </div>
        <textarea
          placeholder="Isi Catatan"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <button onClick={addNote}>Tambah Catatan</button>
      </div>

      {/* Catatan Aktif */}
      <div className="active-notes">
        <h2>Catatan Aktif</h2>
        {filteredNotes.length === 0 ? (
          <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
        ) : (
          filteredNotes.map((note) => (
            <div className="note-item" key={note.id}>
              <div className="note-item__content">
                <h2 className="note-item__title">{note.title}</h2>
                <small className="note-item__date">{showFormattedDate(note.createdAt)}</small>
                <p className="note-item__body">{note.body}</p>
              </div>
              <div className="note-item__action">
                <button
                  className="note-item__archive-button"
                  onClick={() => archiveNote(note.id)}
                >
                  Arsipkan
                </button>
                <button
                  className="note-item__delete-button"
                  onClick={() => deleteNote(note.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Catatan Arsip */}
      <div className="archived-notes">
        {archivedNotes.length > 0 && (
          <div>
            <h2>Catatan Arsip</h2>
            {archivedNotes.map((note) => (
              <div className="note-item" key={note.id}>
                <div className="note-item__content">
                  <h2 className="note-item__title">{note.title}</h2>
                  <small className="note-item__date">{showFormattedDate(note.createdAt)}</small>
                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    className="note-item__unarchive-button"
                    onClick={() => unarchiveNote(note.id)}
                  >
                    Pindahkan ke Berkas Utama
                  </button>
                  <button
                    className="note-item__delete-button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
