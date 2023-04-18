'use client';

import Send from 'public/images/icon-send.svg';
import { useLayoutEffect } from 'react';

import { ElInput } from '@/components';
import { useInput } from '@/hooks';
import apiKeys from '@/utils/apis';

import getRandomProfile from '../modules/functions/getRandomProfile';

const ScreenChat = () => {
  const [messeage, onChangeMessage] = useInput('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const data = await apiKeys.postMessage(messeage);
    console.log(data);
  };

  useLayoutEffect(() => {
    const test = getRandomProfile();
    console.log(test);
  }, []);

  return (
    <div>
      <ElInput
        value={messeage}
        _onChange={onChangeMessage}
        _onKeyPress={onKeyPress}
        placeholder="입력해 주세요."
        button={<Send onClick={sendMessage} />}
      />
    </div>
  );
};

export default ScreenChat;
