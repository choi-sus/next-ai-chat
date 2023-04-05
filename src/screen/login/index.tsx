'use client';

import axios from 'axios';
import Image from 'next/image';
import React from 'react';

import { ElButton, ElInput } from '@/components';
import useInput from '@/hooks/useInput';

const ScreenLogin = () => {
  const [apiKey, onChangeKey] = useInput('');

  const checkApiKeyValidity = async () => {
    const response = await axios.post('/api/check-key', {
      apiKey,
    });

    console.log(response);
  };

  return (
    <React.Fragment>
      <div className="relative">
        <Image src="/assets/logo.svg" alt="umble logo" fill priority />
      </div>
      <ElInput title="API KEY" _onChange={(e) => onChangeKey(e)} />
      <ElButton _onClick={checkApiKeyValidity}>Login</ElButton>
    </React.Fragment>
  );
};

export default ScreenLogin;
