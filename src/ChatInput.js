import React, { useState } from 'react'

export default function ChatInput(props) {
    const [ message, setMessage ] = useState();

    function handleChange(e) {
        console.log('hey this ran')
        let { value } = e.target;
        setMessage(() => value);
    }

    return (
        <form
            action="."
            onSubmit={e => {
                e.preventDefault()
                props.onSubmitMessage(message)
                setMessage(() => '');
            }}
        >
            <input
                type="text"
                placeholder={'Enter message...'}
                value={message}
                onChange={handleChange}
            />
            <input type="submit" value={'Send'} />
      </form>
    )
}
