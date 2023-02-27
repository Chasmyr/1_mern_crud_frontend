import notesStore from "../stores/noteStore"

export default function CreateForm() {
    const store = notesStore()

    if(store.updateForm._id) return <></>

    return (
        <div>
            <h2>Create note</h2>
            <form onSubmit={store.createNote}>
            <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>
            <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>
            <button type="submit">Create note</button>
            </form>
        </div>
    )
}