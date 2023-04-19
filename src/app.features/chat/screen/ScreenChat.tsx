'use client';

import Send from 'public/images/icon-send.svg';

import { ElInput } from '@/components';
import { useInput, useNavigation } from '@/hooks';
import apiKeys from '@/utils/apis';

import useChatDB from '../hooks/useChatDB';

const ScreenChat = () => {
  const nav = useNavigation();
  const [message, onChangeMessage] = useInput('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const id = Number(nav.path().split('/')[2]);

  const { chat, handleAddMessage } = useChatDB(id);

  const user = chat?.members?.filter(
    (character, _) => character.position === 'user',
  )[0];

  const nickname = chat?.members?.map((name, _) => ` ${name.nickname}: `);
  console.log(chat);
  const sendMessage = async () => {
    if (nickname) {
      const data = await apiKeys.postMessage({
        nickname,
        message: `${chat?.message} ${user?.nickname}: ${message}\n`,
      });

      handleAddMessage();
    }
  };

  return (
    <div>
      <ElInput
        value={message}
        _onChange={onChangeMessage}
        _onKeyPress={onKeyPress}
        placeholder="입력해 주세요."
        button={<Send onClick={sendMessage} />}
      />
    </div>
  );
};

export default ScreenChat;
