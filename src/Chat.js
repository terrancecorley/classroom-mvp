import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

function Chat() {
    const [ name, setName ] = useState('Bob');
    const [ messages, setMessages ] = useState([]);
    const [ ws, setWs ] = useState(new WebSocket(URL));

    // ws = new WebSocket(URL);

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            addMessage(message)
        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            setWs(() => new WebSocket(URL));
        }
    }, []);

    function addMessage(message) {
        setMessages((messages) => {
            return [...messages, message];
        })
    }

    function submitMessage(messageString) {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = {
            name: name,
            message: messageString
        };

        ws.send(JSON.stringify(message));
        addMessage(message);
    }

    function handleChange(e) {
        let { value } = e.target;
        setName(() => value);
    }

    return (
        <div>
        <label htmlFor="name">
            Name:&nbsp;
            <input
                type="text"
                id={'name'}
                placeholder={'Enter your name...'}
                value={name}
                onChange={handleChange}
            />
        </label>
        <ChatInput
            ws={ws}
            onSubmitMessage={messageString => submitMessage(messageString)}
        />
        {messages.map((message, index) =>
            <ChatMessage
                key={index}
                message={message.message}
                name={message.name}
            />,
        )}
        </div>
    )
}

export default Chat