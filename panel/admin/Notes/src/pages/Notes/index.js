import React, { useEffect, useState } from "react";

import { AuthGuard } from "../../shared";
import "./style.scss";

import { BACKEND_URL } from "../../shared/constants/Variables";
import axios from "axios";
import { adminHeader } from "../../shared/functions/Token";

import noteImage from "../../assets/notes.jpg";
import Poper from "./Poper/Poper";

function Note() {
  document.title = "Notes";

  const [editId, setEditId] = useState("");
  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const myWindow = (url) => {
    window.open(`/admin/${url}`, "Data", "height=1000, width=2000");
  };

  //   axios.get('http://webcode.me').then(resp => {

  //     console.log(resp.data);
  // });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/notes/all-notes`, { headers: adminHeader() })
      .then((data) => {
        console.log(data?.data?.notes);
        setNotes(data?.data?.notes);
      })
      .catch((err) => {
        console.log(err, "it is an error.");
      });
  }, []);

  function deleteNote(noteId) {
    setAnchorEl(null);

    axios
      .delete(`${BACKEND_URL}/notes/${noteId}`, {
        headers: adminHeader(),
      })
      .then(() => {
        const newNotes = notes.filter(({ _id }) => _id !== noteId);
        setNotes([...newNotes]);
        setDeleteModal(false);
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div className="notes-section">
      <div className="create-note-btn">
        <button onClick={() => myWindow("new-note")} className="create-btn">
          Create
        </button>
      </div>

      <div className="profile-note-container-section">
        <div className="note-container-section">
          {notes.map((note, index) => (
            <div className="note-container" key={index}>
              <div className="note-container-box">
                <div className="note-box">
                  <img
                    className="image-design"
                    src={noteImage}
                    alt={note._id}
                  />

                  <div
                    className="open-porper-modal"
                    onClick={() => {
                      setSelectedNote(note);
                    }}>
                    <p>
                      <Poper
                        setAnchorEl={setAnchorEl}
                        anchorEl={anchorEl}
                        setEditId={setEditId}
                        note={selectedNote}
                        deleteNote={deleteNote}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                      />
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="notes-title">{note?.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Note;
