'use client';
import axios from 'axios';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  async function sendMessage() {
    try {
      const response = await axios.post('/api/chat', {
        message: inputValue,
      });

      setMessages((prevMessages) => [...prevMessages, response.data.msg]);
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
