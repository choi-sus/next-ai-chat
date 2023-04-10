'use client';

import React, { useContext, useState } from 'react';

import { ElButton } from '@/components';
import useInput from '@/hooks/useInput';
import { ModalContext } from '@/layout/screen/ScreenLayout';

import { Modal } from '../components';
import ChatListForm from '../components/ChatListForm';

const ScreenMain = () => {
  const { isModal } = useContext(ModalContext);
  const [createForm, setCreateForm] = useState(false);
  const [roomName, onChangeRoomName] = useInput('');
  const [peopleNum, onChangePeopleNum] = useInput('');

  const showCreateForm = () => {
    setCreateForm(true);
  };

  const props = {
    roomName,
    onChangeRoomName,
    peopleNum,
    onChangePeopleNum,
    createForm,
  };

  return (
    <React.Fragment>
      <ChatListForm {...props}>
        <ElButton type="button" margin="mb-55" _onClick={showCreateForm}>
          방 생성
        </ElButton>
      </ChatListForm>
      {isModal && <Modal />}
    </React.Fragment>
  );
};

export default ScreenMain;
