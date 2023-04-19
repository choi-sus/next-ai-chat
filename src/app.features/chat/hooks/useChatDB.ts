'use client';

import { useEffect, useState } from 'react';

import useRoomsDB from '@/app.features/main/hooks/useRoomsDB';

import getRandomProfile from '../modules/functions/getRandomProfile';

const useChatDB = (id: number) => {
  const idb = window.indexedDB;
  const { handleGetRoom } = useRoomsDB();
  const [chat, setChat] = useState<{
    roomId: number;
    members: {
      id: string;
      nickname: string;
      personalityTraits: string[];
      imageUrl: string;
      position?: string;
    }[];
    message: string;
  }>();

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
          let members: {
            id: string;
            nickname: string;
            personalityTraits: string[];
            imageUrl: string;
            position?: string;
          }[] = [];

          while (members.length < Number(peopleNum)) {
            const randomProfile = getRandomProfile();

            if (!members.includes(randomProfile)) {
              members.push(randomProfile);
            }
          }

          members = members.map((el, i) =>
            i === 0 ? { ...el, position: 'user' } : { ...el, position: 'ai' },
          );

          const nickname = members.map((character, _) => character.nickname);
          const isUser = members
            .filter((character, _) => character.position === 'user')
            .map((character, _) => `${character.nickname} is a user.`);
          const personalityTraits = members
            .filter((character, _) => character.position === 'ai')
            .map(
              (character, _) =>
                `The ${
                  character.nickname
                } is ${character.personalityTraits.join(', ')}.`,
            );

          const data = chatStore.add({
            roomId: id,
            members,
            message: `The following is a conversation between a ${nickname.join(
              ' and ',
            )}. ${isUser} ${personalityTraits.join(' ')}\n\n`,
          });
          data.onsuccess = () => {
            console.log('Data added:', data);

            const objectStore = db
              .transaction('chat', 'readonly')
              .objectStore('chat');

            objectStore.get(data.result).onsuccess = (event: Event) => {
              setChat((event.target as IDBRequest).result);
            };
          };

          data.onerror = (event: Event) => {
            console.error('Error adding data:', event);
          };
        }
      };
    };
  };

  const handleAddMessage = () => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const chatStore = db.transaction('chat', 'readwrite').objectStore('chat');

      const editReq = chatStore.put({ roomId: id });

      editReq.onsuccess = () => {
        console.log('Data edit:', id);
      };

      editReq.onerror = (event: Event) => {
        console.error('Error editing data:', event);
      };
    };
  };

  return {
    chat,
    handleAddMessage,
  };
};

export default useChatDB;
