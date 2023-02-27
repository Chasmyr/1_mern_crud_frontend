import notesStore from "../stores/noteStore"

export default function Note({note}) {
    const store = notesStore()

    return (
        <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => store.deleteNote(note._id)}>Delete note</button>
            <button onClick={() => store.toggleUpdate(note)}>Update note</button>
        </div>
    )
}