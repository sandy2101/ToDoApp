import {useState} from 'react';

function Note(props) {

    const [isEditing,setEditing] = useState(false);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

   
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleContentChange(e) {
    setContent(e.target.value);
    }

    function handleEdit(e) {
        e.preventDefault();
        props.edit(props.id,title,content); 
        setEditing(false);
    }

    const editingTemplate = (
        <form>
            <div className='input-group'>
                <label htmlFor='noteTitle'>Title</label>
                <input onChange={handleTitleChange} type='text' id='noteTitle'  />
            </div>
            <div className='input-group'>
                <label htmlFor='noteContent'>Content</label>
                <textarea rows="4" cols="50" type='textarea' onChange={handleContentChange} id='noteContent' />
            </div>
            <button type='submit' onClick={handleEdit}>Save</button>
            <button onClick={()=>{setEditing(false);}}>Cancel</button>
        </form>
    );
    
    const viewTemplate = (
        <>
             
            <div className='title cont'>{props.title}</div>
            <div className='content cont'>{props.content}</div>
            <div className='lastModified cont'>Last Modified at {props.lastModified}</div>
            
            <div className="btn-group">
                <button onClick={()=>{props.delete(props.id)}}>Delete</button>
                
                <button onClick={()=>{props.archive(props.id)}}>
                {
                    props.isArchived ? 'Unarchive': 'Archive'
                }
                </button>
                <button onClick={()=>{setEditing(true);}}>Edit</button>
            </div>
        </>
    );


    return(
        <li>
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}
function NoteList(props) {
    let n;
    if(props.showMode==='current') {
        n=props.Notes.filter((note)=>note.isArchived===false);
    }
    else if(props.showMode==='archives') {
        n=props.Notes.filter((note)=>note.isArchived===true);
    }
    else if(props.showMode==='all'){
        n=props.Notes;
    }

    return (
    <ul>
        {
          n.map((note)=>{
            return(
              <Note id={note.id}
                title={note.title}
                content={note.content}
                isSelected={note.isSelected}
                lastModified={note.lastModified}
                isArchived={note.isArchived}
                key={note.id}
                toggleSelect={props.toggleSelect}
                delete={props.delete}
                edit={props.edit}
                archive={props.archive}
              />
            );
          })
        }
      </ul>
    );
}
export default NoteList;