import React, { useState, useRef } from 'react'
// The comment form is seperate component and uses a callback prop to change the state of the parent component
// (in practise, I think comments would actually be uploaded to the backend to maintain a consistent state across all clients)
// and the browser would refresh or retieve the new comment from the backend
function CommentForm(props){
    let [comment, setComment] = useState({name: '', message: ''})
    const form = useRef(null);

    const pushForm = (event) => {
        event.preventDefault()
        let data = comment
        props.setComment(props.currentComments, data)
        props.setUpdatedComments(true)
        console.log('successful call')
    }

    return (
        <form className='comments-form' onSubmit={pushForm} ref={form}>
            <label>name: 
                <input 
                    type='text' 
                    id='name'
                    name='comment[name]' 
                    placeholder='Jimbo' 
                    value={comment.name}
                    onChange={(e) => setComment({ ...comment, name: e.target.value })}>
                </input>
            </label>
            <label>message: 
                <input 
                    type='text'
                    name='message'
                    placeholder='Wow, Terrific Stuff Milo! Keep up the good work'
                    onChange={event => setComment({...comment, message: event.target.value })}>
                </input>
            </label>
            <input type='submit' value='post'></input>
        </form>
    )
}// Lesson learned: NEVER put any value inside the submit input tags. catastrophic error.
export default CommentForm