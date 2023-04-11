'use client';

import React, { useContext } from 'react';

import { ElButton } from '@/components';
import useIndexedDB from '@/hooks/useIndexedDB';
import useInput from '@/hooks/useInput';
import { ModalContext } from '@/layout/screen/ScreenLayout';

import { ChatList, Modal } from '../components';

const ScreenMain = () => {
  const { isModal, closeModal } = useContext(ModalContext);
  const [roomName, onChangeRoomName] = useInput('');
  const [peopleNum, onChangePeopleNum] = useInput('');

  const { roomList, handleAddRoom, handleDeleteRoom } = useIndexedDB('rooms');

  const props = {
    roomName,
    onChangeRoomName,
    peopleNum,
    onChangePeopleNum,
    isModal,
    useAddRoom: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddRoom({ roomName, peopleNum });
      closeModal();
    },
  };

  return (
    <React.Fragment>
      {roomList?.map((el, i) => {
        return <ChatList roomName={el.roomName} key={i} />;
      })}
      {isModal && (
        <Modal {...props}>
          {isModal === 'add' ? (
            <ElButton type="submit" margin="mb-55 mt-220">
              방 생성
            </ElButton>
          ) : (
            <>
              <ElButton type="submit" margin="">
                삭제
              </ElButton>
              <ElButton type="submit" margin="">
                수정
              </ElButton>
            </>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ScreenMain;
