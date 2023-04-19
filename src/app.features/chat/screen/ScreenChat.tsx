'use client';

import Send from 'public/images/icon-send.svg';

import { ElInput } from '@/components';
import { useInput, useNavigation } from '@/hooks';
import apiKeys from '@/utils/apis';

import useChatDB from '../hooks/useChatDB';

const ScreenChat = () => {
  const nav = useNavigation();
  const [messeage, onChangeMessage] = useInput('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const id = Number(nav.path().split('/')[2]);

  const { chat } = useChatDB(id);

  const sendMessage = async () => {
    const data = await apiKeys.postMessage(messeage);
    console.log(data);
  };

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
