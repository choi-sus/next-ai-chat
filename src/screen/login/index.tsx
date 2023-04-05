'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

import { ElButton, ElInput } from '@/components';

const ScreenLogin = () => {
  const [a, setA] = useState('asdasd');
  async function checkApiKeyValidity() {
    const response = await axios.post('/api/check-key', {
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    console.log(response);
  }

  return (
    <React.Fragment>
      <div className="relative">
        <Image src="/assets/logo.svg" alt="umble logo" fill priority />
      </div>
      <ElInput title="API KEY" />
      <ElButton>Login</ElButton>
      <button onClick={checkApiKeyValidity}>asd</button>
    </React.Fragment>
  );
};

export default ScreenLogin;
