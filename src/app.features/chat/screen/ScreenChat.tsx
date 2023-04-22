'use client';

import Send from 'public/images/icon-send.svg';

import apiKeys from '@/client/apis';
import { ElImage, ElInput } from '@/components';
import { useInput, useNavigation } from '@/hooks';

import { useChatDB, useScrollEvent } from '../hooks';

const ScreenChat = () => {
  const nav = useNavigation();

  const scrollRef = useScrollEvent();

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
    <section className="relative h-full pb-100">
      <div className="h-full overflow-scroll" ref={scrollRef}>
        {chat?.chatData.map((el, _) => {
          return (
            <div
              key={_}
              className={`${
                user?.nickname === el.sender ? 'items-end' : 'items-start'
              } flex flex-col justify-center`}
            >
              <div>
                <div className="relative h-150 w-150">
                  <ElImage
                    src={`/images/profile-${el.sender}.png`}
                    alt={`${el.sender} 이미지`}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div>
                <div className="text-white">{el.sender}</div>
                <div className="text-white">{el.msg}</div>
                <div className="text-white">{el.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-20 w-full">
        <ElInput
          margin="mx-20"
          value={message}
          _onChange={onChangeMessage}
          _onKeyPress={onKeyPress}
          placeholder="입력해 주세요."
          button={
            <Send
              onClick={sendMessage}
              className="absolute right-20 top-[50%] translate-y-[-50%]"
            />
          }
        />
      </div>
    </section>
  );
};

export default ScreenChat;
