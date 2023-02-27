import { useEffect } from "react";
import notesStore from "../stores/noteStore";
import CreateForm from "./CreateForm";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";

function App() {
  const store = notesStore()

  // fetch data
  useEffect(() => {
    store.fetchNotes()
  }, [store])

  return (
    <div className="App">
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}

export default App;
