'use client';

import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

import type { RoomState } from '@/app.features/main/types/RoomState';
import { ElButton } from '@/components';
import { useNavigation } from '@/hooks';
import useIndexedDB from '@/hooks/useIndexedDB';
import { ModalContext } from '@/layout/screen/ScreenLayout';
import PAGES_HREF from '@/types/PageHref';

import { ChatList, Modal } from '../components';
import checkRegExp from '../modules/function/checkRegExp';

const ScreenMain = () => {
  const nav = useNavigation();
  const { isModal, closeModal } = useContext(ModalContext);
  const [roomInfo, setRoomInfo] = useState({ roomName: '', peopleNum: '' });

  const onChangeRoomInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'peopleNum') {
        value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      }
      setRoomInfo((prev) => {
        return { ...prev, [name]: value };
      });
    },
    [],
  );

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

  const props = {
    roomInfo,
    onChangeRoomInfo,
    isModal,
    useAddRoom,
  };

  return (
    <React.Fragment>
      {roomList?.map((el, i) => {
        return (
          <ChatList
            roomName={el.roomName}
            key={i}
            index={el.id}
            onClick={() => nav.push(`${PAGES_HREF.CHAT}/${el.id}`)}
          />
        );
      })}
      {isModal && (
        <Modal {...props}>
          {isModal === 'add' ? (
            <ElButton
              type="submit"
              margin="mb-55 mt-220"
              disabled={!checkRegExp(roomInfo)}
            >
              방 생성
            </ElButton>
          ) : (
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
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ScreenMain;
