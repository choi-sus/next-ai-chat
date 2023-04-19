'use client';

import { useEffect, useState } from 'react';

import useRoomsDB from '@/app.features/main/hooks/useRoomsDB';

import getRandomProfile from '../modules/functions/getRandomProfile';

const useChatDB = (id: number) => {
  const idb = window.indexedDB;
  const { handleGetRoom } = useRoomsDB();
  const [chat, setChat] = useState();

  useEffect(() => {
    if (!idb) {
      console.log('This browser not support IndexedDB');

      return;
    }

    insertChatData();
  }, [id]);

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

      chatStore.getAll().onsuccess = async (event: Event) => {
        const result = (event.target as IDBRequest).result?.filter(
          (info: { roomId: number }, _: number) => info.roomId === id,
        );

        if (result.length > 0) {
          setChat(result);
        } else {
          let members: {
            id: string;
            nickname: string;
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

          const data = chatStore.add({ roomId: id, members, message: {} });
          data.onsuccess = () => {
            console.log('Data added:', data);

            const objectStore = db
              .transaction('chat', 'readonly')
              .objectStore('chat');

            objectStore.getAll().onsuccess = (event: Event) => {
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

  const handleAddMessage = (
    roomId: number,
    editData: { roomName: string; peopleNum: string },
  ) => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const store = db.transaction('chat', 'readwrite').objectStore('chat');

      const request = store.get(roomId);

      request.onsuccess = () => {
        console.log('Data edit:', roomId);

        let room = request.result;

        room.roomName = editData.roomName;
        room.peopleNum = editData.peopleNum;

        store.put(room);

        const objectStore = db
          .transaction('chat', 'readonly')
          .objectStore('chat');

        objectStore.getAll().onsuccess = (event: Event) => {
          setChat((event.target as IDBRequest).result);
        };
      };

      request.onerror = (event: Event) => {
        console.error('Error editing data:', event);
      };
    };
  };

  return {
    chat,
  };
};

export default useChatDB;
function useRoomDB(): { handleGetRoom: any } {
  throw new Error('Function not implemented.');
}
