'use client';

import Image from 'next/image';
import React from 'react';

import { ElButton, ElInput } from '@/components';
import useInput from '@/hooks/useInput';
import apiKeys from '@/utils/client/apis';

const ScreenLogin = () => {
  const [apiKey, onChangeKey] = useInput('');

  const checkApiKeyValidity = () => {
    apiKeys.checkApiKeyValidity(apiKey);
    onChangeKey();
  };

  return (
    <React.Fragment>
      <div className="relative">
        <Image src="/assets/logo.svg" alt="numble logo" fill priority />
      </div>
      <ElInput
        title="API KEY"
        value={apiKey}
        _onChange={(e) => onChangeKey(e)}
      />
      <ElButton _onClick={checkApiKeyValidity}>Login</ElButton>
    </React.Fragment>
  );
};

export default ScreenLogin;
