'use client';

import { useEffect, useState } from 'react';

import type { RoomState } from '@/app.features/main/types/RoomState';

const useIndexedDB = (storeName: string) => {
  const [roomList, setRoomList] = useState<RoomState[]>([]);

  useEffect(() => {
    const openRequest = window.indexedDB.open('chat_database', 1);

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
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;

      const store = db
        .transaction(storeName, 'readonly')
        .objectStore(storeName);

      store.getAll().onsuccess = (event: Event) => {
        setRoomList((event.target as IDBRequest).result);
      };
    };
  }, []);

  const handleAddRoom = (newData: { roomName: string; peopleNum: string }) => {
    const openRequest = window.indexedDB.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const store = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName);

      const request = store.add(newData);

      request.onsuccess = () => {
        console.log('Data added:', newData);

        const objectStore = db
          .transaction(storeName, 'readonly')
          .objectStore(storeName);

        objectStore.getAll().onsuccess = (event: Event) => {
          setRoomList((event.target as IDBRequest).result);
        };
      };

      request.onerror = (event: Event) => {
        console.error('Error adding data:', event);
      };
    };
  };

  const handleEditRoom = (
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
      const store = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName);

      const request = store.get(roomId);

      request.onsuccess = () => {
        console.log('Data edit:', roomId);

        let room = request.result;

        room.roomName = editData.roomName;
        room.peopleNum = editData.peopleNum;

        store.put(room);

        const objectStore = db
          .transaction(storeName, 'readonly')
          .objectStore(storeName);

        objectStore.getAll().onsuccess = (event: Event) => {
          setRoomList((event.target as IDBRequest).result);
        };
      };

      request.onerror = (event: Event) => {
        console.error('Error editing data:', event);
      };
    };
  };

  const handleDeleteRoom = (roomId: number) => {
    const openRequest = window.indexedDB.open('chat_database', 1);

    openRequest.onerror = (event: Event) => {
      console.error('indexedDB error: ', event);
    };

    openRequest.onsuccess = (event: Event) => {
      console.info('database open success!');

      const db = (event.target as IDBRequest).result;
      const store = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName);

      const request = store.delete(roomId);

      request.onsuccess = () => {
        console.log('Data deleted:', roomId);

        const objectStore = db
          .transaction(storeName, 'readonly')
          .objectStore(storeName);

        objectStore.getAll().onsuccess = (event: Event) => {
          setRoomList((event.target as IDBRequest).result);
        };
      };

      request.onerror = (event: Event) => {
        console.error('Error deleting data:', event);
      };
    };
  };

  return {
    roomList,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
  };
};

export default useIndexedDB;
