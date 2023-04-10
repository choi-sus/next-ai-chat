'use client';

import React from 'react';

import { ElImage } from '@/components';
import { useInput, useNavigation } from '@/hooks';
import PAGES_HREF from '@/types/PageHref';
import apiKeys from '@/utils/client/apis';

import ApiKeyForm from '../components/ApiKeyForm';

const ScreenLogin = () => {
  const nav = useNavigation();

  const [apiKey, onChangeKey] = useInput('');

  const clickApiKeyConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await apiKeys.getApiKeyConfirm(apiKey);
    if (data) {
      alert('성공!');
      nav.push(PAGES_HREF.MAIN);
    } else {
      alert('실패');
      onChangeKey();
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      clickApiKeyConfirm(e);
    }
  };

  return (
    <React.Fragment>
      <div className="mx-120 mb-85 pt-200">
        <ElImage
          src="/images/logo-blue.svg"
          alt="numble logo"
          className="!relative object-cover"
        />
      </div>
      <ApiKeyForm
        clickApiKeyConfirm={clickApiKeyConfirm}
        _onKeyPress={onKeyPress}
        apiKey={apiKey}
        onChangeKey={onChangeKey}
      />
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