import React from 'react';

import { ElButton, ElInput } from '@/components';
import useInput from '@/hooks/useInput';

const ScreenMain = () => {
  const [roomName, onChangeRoomName] = useInput('');
  const [peopleNum, onChangePeopleNum] = useInput('');

  return (
    <React.Fragment>
      <ElInput title="방 이름" value={roomName} _onChange={onChangeRoomName} />
      <ElInput
        title="방 인원"
        value={peopleNum}
        _onChange={onChangePeopleNum}
      />
      <ElButton type="button" margin="">
        방 생성
      </ElButton>
    </React.Fragment>
  );
};

export default ScreenMain;
