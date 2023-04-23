import { useEffect, useState } from 'react';

const useGetRoomName = (path: string[]) => {
  const [roomName, setRoomName] = useState<string | null>();

  useEffect(() => {
    if (Number(path[2])) {
      const openRequest = window.indexedDB.open('chat_database', 1);

      openRequest.onsuccess = (event: Event) => {
        console.info('database open success!');

        const db = (event.target as IDBRequest).result;
        const roomStore = db
          .transaction('rooms', 'readonly')
          .objectStore('rooms');

        const get = roomStore.get(Number(path[2]));
        get.addEventListener('success', (event: Event) => {
          const { roomName } = (event.target as IDBRequest).result;
          setRoomName(roomName);
        });
      };
    }
  }, [path]);

  return roomName;
};

export default useGetRoomName;
