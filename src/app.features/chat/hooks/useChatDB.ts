'use client';

import { useEffect, useState } from 'react';

import useRoomsDB from '@/app.features/main/hooks/useRoomsDB';

import { getRandomProfile, getTimeString } from '../modules/functions';
import type { ChatTypes } from '../types/ChatTypes';
import type { MembersTypes } from '../types/MembersTypes';

const useChatDB = (id: number) => {
  const idb = window.indexedDB;
  const { handleGetRoom } = useRoomsDB();
  const [chat, setChat] = useState<ChatTypes>();

  useEffect(() => {
    if (!idb) {
      console.log('This browser not support IndexedDB');

      return;
    }

    insertChatData();
  }, []);

  const insertChatData = async () => {
    const { peopleNum } = await handleGetRoom(id);

    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const chatStore = db.transaction('chat', 'readwrite').objectStore('chat');

      chatStore.get(id).onsuccess = async (event: Event) => {
        const result = (event.target as IDBRequest).result;
        if (result) {
          setChat(result);

          return;
        } else {
          let members: MembersTypes[] = [];

          while (members.length < Number(peopleNum)) {
            const randomProfile = getRandomProfile();

            if (!members.includes(randomProfile)) {
              members.push(randomProfile);
            }
          }

          members = members.map((el, i) =>
            i === 0 ? { ...el, position: 'user' } : { ...el, position: 'ai' },
          );

          const newData = chatStore.add({
            roomId: id,
            members,
            message: '',
            chatData: [],
          });

          newData.onsuccess = () => {
            console.log('Data added:', newData);

            const objectStore = db
              .transaction('chat', 'readonly')
              .objectStore('chat');

            objectStore.get(newData.result).onsuccess = (event: Event) => {
              setChat((event.target as IDBRequest).result);
            };
          };

          newData.onerror = (event: Event) => {
            console.error('Error adding data:', event);
          };
        }
      };
    };
  };

  const handleAddMessage = ({
    chat,
    data,
  }: {
    chat: ChatTypes;
    data: string;
  }) => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const chatStore = db.transaction('chat', 'readwrite').objectStore('chat');

      const newChatData = data
        .split('\n')
        .filter((v, _) => v.includes(':'))
        .map((el, _) => el.split(': '))
        .map((el, _) => {
          return { sender: el[0], msg: el[1], time: getTimeString() };
        });

      const editReq = chatStore.put({
        ...chat,
        message: chat.message + data,
        chatData: [...chat.chatData, ...newChatData],
      });

      editReq.onsuccess = () => {
        console.log('Data edit:', id);
        setChat({
          ...chat,
          message: chat.message + data,
          chatData: [...chat.chatData, ...newChatData],
        });

        editReq.onerror = (event: Event) => {
          console.error('Error editing data:', event);
        };
      };
    };
  };

  return {
    chat,
    handleAddMessage,
  };
};

export default useChatDB;
