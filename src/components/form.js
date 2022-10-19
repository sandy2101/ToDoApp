import {useState} from 'react';

function Form(props) {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    function TitleChange(e) {
    
        setTitle(e.target.value);
    }
    function ContentChange(e) {

        setContent(e.target.value);
    }
    function Submit(e) {
        e.preventDefault();
        if(title!==''&&content!=='')
        {props.saveNote(title,content);}
        else{return;}
        e.target.reset();
        setTitle('');
        setContent('');
    }
    return(
        <form className='newNote' onSubmit={Submit}>
            <div className='input-group'>
                <label htmlFor='noteTitle'>Title</label>
                <input placeholder='Enter the Title...'  onChange={TitleChange} type='text' id='noteTitle'/>
            </div>
            <div className='input-group'>
                <label htmlFor='noteContent'>Content</label>
                <input placeholder='Enter the Notes...'type='textarea' rows='5' cols='50' onChange={ContentChange} id='noteContent'/>
            </div>
            <button type='submit'>Save</button>
        </form>
    );
}
export default Form;
