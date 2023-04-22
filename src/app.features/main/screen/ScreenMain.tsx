'use client';

import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

import useRoomsDB from '@/app.features/main/hooks/useRoomsDB';
import type { RoomState } from '@/app.features/main/types/RoomState';
import { ElButton } from '@/components';
import { useNavigation } from '@/hooks';
import { ModalContext } from '@/layout/screen/ScreenLayout';
import PAGES_HREF from '@/types/PageHref';

import { ChatForm, ChatList, Modal } from '../components';
import { checkRegExp } from '../modules/function';

const ScreenMain = () => {
  const nav = useNavigation();
  const { isModal, closeModal } = useContext(ModalContext);
  const { roomList, handleAddRoom, handleEditRoom, handleDeleteRoom } =
    useRoomsDB();
  const [roomInfo, setRoomInfo] = useState({ roomName: '', peopleNum: '' });

  useLayoutEffect(() => {
    if (isModal && isModal !== 'add') {
      const roomInfo: RoomState[] = roomList.filter(
        (room, _) => room.id === Number(isModal),
      );
      setRoomInfo(roomInfo[0]);
    } else if (isModal === 'add') {
      setRoomInfo({ roomName: '', peopleNum: '' });
    }
  }, [isModal, roomList]);

  const onChangeRoomInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setRoomInfo((prev) => {
        return { ...prev, [name]: value };
      });
    },
    [],
  );

  const useAddRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddRoom(roomInfo);
    closeModal();
  };

  const useDeleteRoom = () => {
    handleDeleteRoom(Number(isModal));
    closeModal();
  };

  const useEditRoom = () => {
    handleEditRoom(Number(isModal), roomInfo);
    closeModal();
  };

  console.log(roomList);

  return (
    <section>
      {roomList?.map((el, i) => {
        return (
          <ChatList
            roomName={el.roomName}
            key={i}
            index={el.id}
            onClick={() => nav.push(PAGES_HREF.CHAT, el.id)}
          />
        );
      })}
      <Modal>
        {isModal === 'add' ? (
          <ChatForm roomInfo={roomInfo} onChangeRoomInfo={onChangeRoomInfo}>
            <ElButton
              type="button"
              margin="mb-55 mt-220"
              _onClick={useAddRoom}
              disabled={!checkRegExp(roomInfo)}
            >
              방 생성
            </ElButton>
          </ChatForm>
        ) : (
          <ChatForm roomInfo={roomInfo} onChangeRoomInfo={onChangeRoomInfo}>
            <div className="mt-30 flex justify-end">
              <ElButton sx del type="button" margin="" _onClick={useDeleteRoom}>
                삭제
              </ElButton>
              <ElButton
                sx
                type="button"
                margin="ml-10"
                _onClick={useEditRoom}
                disabled={!checkRegExp(roomInfo)}
              >
                수정
              </ElButton>
            </div>
          </ChatForm>
        )}
      </Modal>
    </section>
  );
};

export default ScreenMain;
