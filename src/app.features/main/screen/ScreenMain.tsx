'use client';

import React, { useContext, useLayoutEffect, useState } from 'react';

import type { RoomState } from '@/app.features/main/types/RoomState';
import { ElButton } from '@/components';
import useIndexedDB from '@/hooks/useIndexedDB';
import { ModalContext } from '@/layout/screen/ScreenLayout';

import { ChatList, Modal } from '../components';

const ScreenMain = () => {
  const { isModal, closeModal } = useContext(ModalContext);
  const [roomInfo, setRoomInfo] = useState({ roomName: '', peopleNum: '' });

  const onChangeRoomInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const { roomList, handleAddRoom, handleEditRoom, handleDeleteRoom } =
    useIndexedDB('rooms');

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

  const props = {
    roomInfo,
    onChangeRoomInfo,
    isModal,
    useAddRoom: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddRoom(roomInfo);
      closeModal();
    },
  };

  return (
    <React.Fragment>
      {roomList?.map((el, i) => {
        return <ChatList roomName={el.roomName} key={i} index={el.id} />;
      })}
      {isModal && (
        <Modal {...props}>
          {isModal === 'add' ? (
            <ElButton type="submit" margin="mb-55 mt-220">
              방 생성
            </ElButton>
          ) : (
            <div className="mt-30 flex justify-end">
              <ElButton
                sx
                del
                type="button"
                margin=""
                _onClick={() => {
                  handleDeleteRoom(Number(isModal));
                  closeModal();
                }}
              >
                삭제
              </ElButton>
              <ElButton
                sx
                type="button"
                margin="ml-10"
                _onClick={() => {
                  handleEditRoom(Number(isModal), roomInfo);
                  closeModal();
                }}
              >
                수정
              </ElButton>
            </div>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ScreenMain;
