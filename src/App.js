import React, { useState, useEffect } from "react";
import "./App.css";
import deleteIcon from './ic_delete_black_48dp.png';
import $ from "jquery";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [noteEditingNow, setNoteEditingNow] = useState(null);
  const [currentEdit, setCurrentEdit] = useState('');

  useEffect(() => {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      setNotes(notes)
    }
    $(".add-note").click(function() {
      $(".top").height("100vh");
      $(".submit, .cancel").show(300);
    });
    $(".submit, .cancel").click(function() {
      $(".top").height("25%");
      $(".top").width("100%");
      $(".submit, .cancel").hide(300);
    });
  }, []);

  useEffect(() => {
        const json = JSON.stringify(notes);
        localStorage.setItem("notes", json);
  }, [notes]);

  function addNote(){ //onClick
    let notesArray = [...notes];
    notesArray.push(currentNote);
    setNotes(notesArray);
    setCurrentNote('');
  };

  function deleteNote(indexToDelete){ //onClick
    let remainingNotes = [...notes].filter(
      (note, index) => index !== indexToDelete
    );
    setNotes(remainingNotes);
  };

  function setNoteEditing(index){ //onClick
    setNoteEditingNow(index);
    setCurrentEdit(notes[index]);
  };
  
  function editNote(event){ //onChange
    setCurrentEdit(event.target.value);
  };
  
  function submitEdit(index){ //onClick
    let allNotes = [...notes];
    allNotes[index] = currentEdit;
    setNotes(allNotes);
    setNoteEditingNow(null);
  };
      
  return (
    <div className="box">
      <div className="top">
        <textarea
          onChange={event => setCurrentNote(event.target.value)}
          value={currentNote}
          className="add-note"
          placeholder="Take a Note ..."
        />
        <br/>
        <Button bgColor="#a3405b" label="Submit" classyName="submit" func={addNote} />
        <Button bgColor="#343440" label="Cancel" classyName="cancel" func={() => {setCurrentNote('')}} />
      </div>

      <div className="bottom">
      {
      notes.map(
        (note, index) => (
          <div className="note" key={index}>
            {
            (noteEditingNow === null || noteEditingNow !== index) ? 
              (
              <div className="note-stuff">
                <div className="note-text" onClick={() => setNoteEditing(index)}>{note}</div>
                <img 
                  src={deleteIcon} 
                  alt="delete-note" 
                  onClick={() => deleteNote(index)}
                  className="delete"
                />
              </div>
              ) : 
              (
              <div className="note-edit">
                <textarea
                  value={currentEdit}
                  onChange={event => editNote(event)}
                  className="edit-text"
                />
                <div className="edit-buttons">
                  <Button bgColor="#a3405b" label="Save" classyName="save-edit" func={() => {submitEdit(index)}} />
                  <Button bgColor="#343440" label="Cancel" classyName="cancel-edit" func={() => {setNoteEditingNow(null)}} />
                </div>
              </div>
              )
            }
          </div>
        )
      )
      }
      </div>
    </div>
  );
}

function Button(props){
  var style={
    backgroundColor: props.bgColor
  }
  return(
    <button onClick={props.func} className={props.classyName} style={style}>{props.label}</button>
  )
}

export default App;