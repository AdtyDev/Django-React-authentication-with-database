import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"



function Home(){

    const [notes, setNotes] = useState([]);
    const [content, setContent ] = useState("")
    const [title, setTitle ] = useState("")

    useEffect(() =>{
        getNotes();
    }, [] )

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data), console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteNote = (id) =>{
        // this deletes the note via the id that is passed and deleted by the user
        api.delete(`/api/notes/delete/${id}`).then((res) => {
            if (res.status === 204 ) alert("Note Deleted");
            else alert("Failed to delete.");
            getNotes();
    }).catch((error) =>alert(error));
    // after deleting it will refresh the screen showing the note is deleted and refreshed
    
    };

    const createNote = (e) =>{
        e.preventDefault();
        api.post("/api/notes/",{content,title}).then((res) =>{
            if (res.status === 201) alert("Note Created");
                else alert("failed to make");
                getNotes();
        }).catch((err) =>alert(err));
        
    };

    // now need to create two components for html 1st to show notes and 2nd to a form to create a note 


    return (
        <div>
                <div>
                    <h2>Notes</h2>
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id}/>
                        ))}
                </div>
        <h2>Create Your Note here</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title: </label>
            <br />
            <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                onChange={(e) =>setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="title">Title: </label>
            <br />
            <textarea
                id ="content"
                name="content"
                required
                onChange={(e) => setContent(e.target.value)}
                value={content}>
            </textarea>
            <br/>
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    );
}

export default Home