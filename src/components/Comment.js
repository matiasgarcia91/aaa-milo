import React from 'react';

function Comment(props) {
    return (
        <div className='comments'>
            <p>name: {props.name}</p>
            <p>message: {props.message}</p>
        </div>
    )
}
export default Comment