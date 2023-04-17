'use client';

import { useState } from 'react';

import apiKeys from '@/utils/apis';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Room = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    const data = await apiKeys.postMessage(inputValue);

    setMessages((prevMessages) => [...prevMessages, data.msg]);
    setInputValue('');
  };

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
            <p>{message?.text}</p>
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
};

export default Room;
