import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [notes, setNotes] = useState(null)
  const [createForm, setCreateForm] = useState({
    title: '',
    body: ''
  })
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: '',
    body: ''
  })

  // functions
  const fetchNotes = async () => {
    // feth the notes
    const response = await axios.get('http://localhost:3006/notes')
    // set tostate
    setNotes(response.data.notes)
    console.log(response)
  }

  const updateCreateFormField = (e) => {
    const {name, value} = e.target
    setCreateForm({
      ...createForm,
      [name]: value
    })
  }

  const createNote = async (e) => {
    e.preventDefault()

    const res = await axios.post("http://localhost:3006/notes", createForm)

    setNotes([...notes, res.data.note])
    
    // then clear form state
    setCreateForm({title: '', body: ''})
  }

  const deleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3006/notes/${_id}`)
    
    const newNotes = [...notes].filter(note => {
      return note._id !== _id
    })

    setNotes(newNotes)
  }

  const handleUpdateFieldChange = (e) => {
    const {value, name} = e.target

    setUpdateForm({
      ...updateForm,
      [name]: value
    })
  }

  const toggleUpdate = (note) => {
    setUpdateForm({title: note.title, body: note.body, _id: note._id})
  }

  const updateNote = async (e) => {
    e.preventDefault()
    const {title, body} = updateForm

    const res = await axios.put(`http://localhost:3006/notes/${updateForm._id}`, {title, body})
    const newNotes = [...notes]
    const noteIndex = notes.findIndex(note => {
      return note._id = updateForm._id
    })
    newNotes[noteIndex] = res.data.note 
    setNotes(newNotes)

    // clear update form state
    setUpdateForm({
      _id: null,
      title: '',
      body: ''
    })
  }

  // fetch data
  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="App">
      <div>
          <h2>Notes:</h2>
          {notes && notes.map(note => {
            return(
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={() => deleteNote(note._id)}>Delete note</button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
              </div>
            )
          })}
      </div>

      {updateForm._id && (
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <input name="title" value={updateForm.title} onChange={handleUpdateFieldChange}/>
            <textarea name="body" value={updateForm.body} onChange={handleUpdateFieldChange}/>
            <button type="submit">Update note</button>
          </form>
      </div>
      )}
      
      {!updateForm._id && (
        <div>
        <h2>Create note</h2>
        <form onSubmit={createNote}>
          <input name="title" value={createForm.title} onChange={updateCreateFormField}/>
          <textarea name="body" value={createForm.body} onChange={updateCreateFormField}/>
          <button type="submit">Create note</button>
        </form>
      </div>
      )} 
    </div>
  );
}

export default App;
