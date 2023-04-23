import React from 'react';

import { ElImage } from '@/components';

import type { ChatDataTypes } from '../types/ChatDataTypes';
import type { MembersTypes } from '../types/MembersTypes';

interface ProfileProps {
  chatData: ChatDataTypes[] | undefined;
  user: MembersTypes | undefined;
}

const Profile = ({ chatData, user }: ProfileProps) => {
  return (
    <React.Fragment>
      {chatData?.map((el, _) => (
        <div
          key={_}
          className={`${
            user?.nickname === el.sender ? 'items-end' : 'items-start'
          } mb-15 flex flex-col justify-center`}
        >
          <div>
            <div className="relative h-70 w-70 rounded-[50%] bg-white">
              <ElImage
                src={`/images/profile-${el.sender}.png`}
                alt={`${el.sender} 이미지`}
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <h3 className="mx-10 my-5 text-center text-white">{el.sender}</h3>
          <div
            className={`${
              user?.nickname === el.sender ? 'flex-row-reverse' : 'flex-row'
            } flex items-end`}
          >
            <p
              className={`${
                user?.nickname === el.sender
                  ? 'ml-10 bg-[#3A3A3A]'
                  : 'mr-10 bg-[#202020]'
              } max-w-[250px] rounded-6 px-10 py-10 text-white`}
            >
              {el.msg}
            </p>
            <span className="text-12 text-white">{el.time}</span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Profile;
