import notesStore from "../stores/noteStore"

export default function UpdateForm() {
    const store = notesStore()

    if (!store.updateForm._id) return <></>

    return (
        <div>
            <h2>Update note</h2>
            <form onSubmit={store.updateNote}>
                <input name="title" value={store.updateForm.title} onChange={store.handleUpdateFieldChange}/>
                <textarea name="body" value={store.updateForm.body} onChange={store.handleUpdateFieldChange}/>
                <button type="submit">Update note</button>
            </form>
        </div>
    )
}