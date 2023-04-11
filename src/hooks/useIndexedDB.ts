'use client';

import { useEffect, useState } from 'react';

interface RoomState {
  id: number;
  roomName: string;
  peopleNum: string;
}

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
  }, [storeName]);

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

  const handleDeleteRoom = (id: number) => {
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

      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Data deleted:', id);

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
    handleDeleteRoom,
  };
};

export default useIndexedDB;
