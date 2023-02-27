import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
    notes: null,

    createForm: {
        title: '',
        body: ''
    },

    updateForm: {
        _id: null,
        title: '',
        body: ''
    },

    fetchNotes: async () => {
        // feth the notes
        const response = await axios.get('http://localhost:3006/notes')
        // set tostate
        set({notes: response.data.notes})
    },

    updateCreateFormField: (e) => {
        const {name, value} = e.target

        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value
                }
            }
        })
    },

    createNote:  async (e) => {
        e.preventDefault()

        const { createForm, notes } = notesStore.getState()
        const res = await axios.post("http://localhost:3006/notes", createForm)
    
        set({
            notes: [...notes, res.data.note],
            createForm: {
                title: '',
                body: ''
            }
        })
    },

    deleteNote: async (_id) => {
        await axios.delete(`http://localhost:3006/notes/${_id}`)
        const {notes} = notesStore.getState()
        
        const newNotes = notes.filter(note => {
          return note._id !== _id
        })
    
        set({notes: newNotes})
    },

    handleUpdateFieldChange: (e) => {
        const {value, name} = e.target
    
        set(state => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value
                }
            }
        })
    },

    toggleUpdate: ({_id, title, body}) => {

        set({
            updateForm: {
                title: title, 
                body: body, 
                _id: _id
            }
        })
    },

    updateNote: async (e) => {
        e.preventDefault()
        const {
            updateForm: {title, body, _id},
            notes,
        } = notesStore.getState()
    
        const res = await axios.put(`http://localhost:3006/notes/${_id}`, {title, body})

        const newNotes = [...notes]
        const noteIndex = notes.findIndex(note => {
          return note._id = _id
        })
        newNotes[noteIndex] = res.data.note 
        
        set({
            notes: newNotes,
            updateForm: {
                _id: null,
                title: '',
                body: ''
            }
        })
    }
}))

export default notesStore