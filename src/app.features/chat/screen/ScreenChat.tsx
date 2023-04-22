'use client';

import Send from 'public/images/icon-send.svg';

import { ElImage, ElInput } from '@/components';
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

  const sendMessage = async () => {
    const { data } = await apiKeys.postMessage({
      members: chat!.members,
      message: `${chat?.message} ${user?.nickname}: ${message}\n`,
    });

    handleAddMessage({
      chat: chat!,
      data: `${user?.nickname}: ${message}\n\n ${data}`,
    });

    onChangeMessage();
  };

  return (
    <section>
      {chat?.chatData.map((el, _) => {
        return (
          <div
            key={_}
            className={`${
              user?.nickname === el.sender ? 'items-end' : 'items-start'
            } flex flex-col justify-center`}
          >
            <div>
              <div className="h-150 w-150">
                <ElImage
                  src={`/images/profile-${el.sender}.png`}
                  alt={`${el.sender} 이미지`}
                  className="!relative object-cover"
                />
              </div>
            </div>
            <div>
              <div className="text-white">{el.sender}</div>
              <div className="text-white">{el.msg}</div>
            </div>
          </div>
        );
      })}
      <ElInput
        value={message}
        _onChange={onChangeMessage}
        _onKeyPress={onKeyPress}
        placeholder="입력해 주세요."
        button={<Send onClick={sendMessage} />}
      />
    </section>
  );
};

export default ScreenChat;
