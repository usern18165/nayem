import React, { useState } from "react";

import "./style.scss";
import TextEditorQuiiill from "./TextEditorQuiiill";
import axios from "axios";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { adminHeader } from "../../../shared/functions/Token";

function NewNotes() {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("No Content");

  const options = [
    { value: " ", label: "Select Title" },
    { value: "about", label: "About" },
    { value: "career", label: "Career" },
    { value: "privacy", label: "Privacy" },
    { value: "terms-and-conditions", label: "Terms & Conditions" },
  ];

  function handleChange(e) {
    setTitle(e.target.value);
  }

  const submitHandler = () => {
    axios
      .post(
        `${BACKEND_URL}/notes/add-notes`,
        {
          title: title,
          content: content,
        },
        { headers: adminHeader() }
      )
      .then((res) => {
        window.close();
      })
      .catch((err) => {
        console.log(err, "it is an error.");
      });
  };

  return (
    <div>
      <div className="create-note-header-section">
        <select
          className="title-input-field"
          // value={}
          onChange={handleChange}>
          {options.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>

        <div className="editorSubmit" onClick={submitHandler}>
          <button className="create-note-save-btn-active"> Save </button>
        </div>
      </div>

      <div className="quillMainDiv" style={{}}>
        <div className="editor" style={{ width: "100%" }}>
          <TextEditorQuiiill setContent={setContent} />
        </div>
      </div>
    </div>
  );
}

export default NewNotes;
