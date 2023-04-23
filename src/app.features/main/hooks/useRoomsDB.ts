'use client';

import { useEffect, useState } from 'react';

import type { RoomState } from '@/app.features/main/types/RoomState';

const useRoomsDB = () => {
  const idb = window.indexedDB;
  const [roomList, setRoomList] = useState<RoomState[]>([]);

  useEffect(() => {
    if (!idb) {
      console.log('This browser not support IndexedDB');

      return;
    }

    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onupgradeneeded = (event: Event) => {
      const db = (event.target as IDBRequest).result;

      const roomStore = db.createObjectStore('rooms', {
        keyPath: 'id',
        autoIncrement: true,
      });

      roomStore.createIndex('roomName', 'roomName', { unique: true });
      roomStore.createIndex('peopleNum', 'peopleNum');

      const chatStore = db.createObjectStore('chat', {
        keyPath: 'roomId',
        autoIncrement: true,
      });

      chatStore.createIndex('roomId', 'roomId', { unique: true });
      chatStore.createIndex('members', 'members');
      chatStore.createIndex('chatData', 'chatData');
      chatStore.createIndex('message', 'message');
    };

    openRequest.onsuccess = () => {
      handleGetAllRoom();
    };
  }, []);

  const handleGetAllRoom = () => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const roomStore = db
        .transaction('rooms', 'readonly')
        .objectStore('rooms');

      roomStore.getAll().onsuccess = (event: Event) => {
        setRoomList((event.target as IDBRequest).result);
      };
    };
  };

  const handleGetRoom = (roomId: number): Promise<RoomState> => {
    return new Promise((resolve, reject) => {
      const openRequest = idb.open('chat_database', 1);

      openRequest.onerror = (event: Event) => {
        reject(event);
      };

      openRequest.onsuccess = (event: Event) => {
        console.info('database open success!');

        const db = (event.target as IDBRequest).result;
        const roomStore = db
          .transaction('rooms', 'readonly')
          .objectStore('rooms');

        roomStore.get(roomId).onsuccess = (event: Event) => {
          resolve((event.target as IDBRequest).result);
        };
      };
    });
  };

  const handleAddRoom = (newData: { roomName: string; peopleNum: string }) => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const roomStore = db
        .transaction('rooms', 'readwrite')
        .objectStore('rooms');

      const addReq = roomStore.add(newData);

      addReq.onsuccess = () => {
        console.log('Data added:', newData);

        handleGetAllRoom();
      };

      addReq.onerror = (event: Event) => {
        if ((event.target as IDBRequest).error?.name === 'ConstraintError') {
          alert('중복된 방 이름입니다.');

          return;
        }
        console.error('Error adding data:', event);
      };
    };
  };

  const handleEditRoom = (
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
      const roomStore = db
        .transaction('rooms', 'readwrite')
        .objectStore('rooms');

      const editReq = roomStore.put({ ...editData, id: roomId });

      editReq.onsuccess = () => {
        console.log('Data edit:', roomId);

        handleGetAllRoom();
      };

      editReq.onerror = (event: Event) => {
        if ((event.target as IDBRequest).error?.name === 'ConstraintError') {
          alert('중복된 방 이름입니다.');

          return;
        }
        console.error('Error editing data:', event);
      };
    };
  };

  const handleDeleteRoom = (roomId: number) => {
    const openRequest = idb.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const roomStore = db
        .transaction('rooms', 'readwrite')
        .objectStore('rooms');

      const deleteReq = roomStore.delete(roomId);

      deleteReq.onsuccess = () => {
        console.log('Data deleted:', roomId);

        handleGetAllRoom();
      };

      deleteReq.onerror = (event: Event) => {
        console.error('Error deleting data:', event);
      };
    };
  };

  return {
    roomList,
    handleGetAllRoom,
    handleGetRoom,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
  };
};

export default useRoomsDB;
