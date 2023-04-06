'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ElButton, ElInput } from '@/components';
import useInput from '@/hooks/useInput';
import apiKeys from '@/utils/client/apis';

const ScreenLogin = () => {
  const router = useRouter();

  const [apiKey, onChangeKey] = useInput('');

  const checkApiKeyValidity = async () => {
    const data = await apiKeys.getApiKeyConfirm(apiKey);
    if (data) {
      alert('성공!');
      router.push('/main');
    } else {
      alert('실패');
      onChangeKey();
    }
  };

  return (
    <React.Fragment>
      <div className="mx-110 mb-85 mt-200">
        <Image
          src="/assets/logo.svg"
          alt="numble logo"
          className="!relative object-cover"
          fill
          priority
        />
      </div>
      <ElInput
        title="API KEY"
        value={apiKey}
        _onChange={(e) => onChangeKey(e)}
      />
      <ElButton _onClick={checkApiKeyValidity} margin="mt-250">
        Login
      </ElButton>
      <div className="text-center">
        <a
          className="leading-55 text-white underline"
          target="_blank"
          href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key"
          rel="noreferrer noopener"
        >
          KEY 발급받는 방법
        </a>
      </div>
    </React.Fragment>
  );
};

export default ScreenLogin;
