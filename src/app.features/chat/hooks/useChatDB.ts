'use client';

import { useEffect, useState } from 'react';

const useChatDB = (id: number) => {
  const [chat, setChat] = useState();

  useEffect(() => {
    const openRequest = window.indexedDB.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onupgradeneeded = (event: Event) => {
      const db = (event.target as IDBRequest).result;

      const chatStore = db.createObjectStore('chat', {
        keyPath: 'id',
        autoIncrement: true,
      });

      chatStore.createIndex('roomId', 'roomId', { unique: true });
      chatStore.createIndex('message', 'message');
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const chatStore = db.transaction('chat', 'readwrite').objectStore('chat');

      chatStore.getAll().onsuccess = (event: Event) => {
        const result = (event.target as IDBRequest).result?.filter(
          (info: { roomId: number }, _: number) => info.roomId === id,
        );

        if (result.length > 0) {
          setChat(result);
        } else {
          const data = chatStore.add({ roomId: id, message: {} });
          console.log(data);
          data.onsuccess = () => {
            console.log('Data added:');

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
  }, []);

  const handleAddMessage = (
    roomId: number,
    editData: { roomName: string; peopleNum: string },
  ) => {
    const openRequest = window.indexedDB.open('chat_database', 1);

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
