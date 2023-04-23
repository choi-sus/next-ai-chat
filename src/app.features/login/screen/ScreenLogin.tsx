'use client';

import React from 'react';

import apiKeys from '@/client/apis';
import { ElImage } from '@/components';
import { useInput, useNavigation } from '@/hooks';
import PAGES_HREF from '@/types/PageHref';

import { ApiKeyForm } from '../components';

const ScreenLogin = () => {
  const nav = useNavigation();

  const [apiKey, onChangeKey] = useInput('');

  const confirmApiKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await apiKeys.getApiKeyConfirm(apiKey);
    if (data) {
      alert('로그인이 성공적으로 되었습니다!');
      nav.push(PAGES_HREF.MAIN);
    } else {
      alert('Api Key가 일치하지 않습니다.');
      onChangeKey();
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      confirmApiKey(e);
    }
  };

  return (
    <section className="px-30">
      <div className="mx-120 mb-85 pt-100">
        <ElImage
          src="/images/logo-blue.svg"
          alt="numble logo"
          className="!relative object-cover"
        />
      </div>
      <ApiKeyForm
        confirmApiKey={confirmApiKey}
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
    </section>
  );
};

export default ScreenLogin;
