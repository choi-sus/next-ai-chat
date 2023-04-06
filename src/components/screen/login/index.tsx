'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { ElButton, ElImage, ElInput } from '@/components/elements';
import useInput from '@/hooks/useInput';
import apiKeys from '@/utils/client/apis';

const ScreenLogin = () => {
  const router = useRouter();

  const [apiKey, onChangeKey] = useInput('');

  const clickApiKeyConfirm = async () => {
    const data = await apiKeys.getApiKeyConfirm(apiKey);
    if (data) {
      alert('성공!');
      router.push('/main');
    } else {
      alert('실패');
      onChangeKey();
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickApiKeyConfirm();
    }
  };

  return (
    <React.Fragment>
      <div className="mx-120 mb-85 pt-200">
        <ElImage
          src="/assets/logo.svg"
          alt="numble logo"
          className="!relative object-cover"
        />
      </div>
      <ElInput
        title="API KEY"
        value={apiKey}
        _onKeyPress={(e) => handleOnKeyPress(e)}
        _onChange={(e) => onChangeKey(e)}
      />
      <ElButton _onClick={clickApiKeyConfirm} margin="mt-240">
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
