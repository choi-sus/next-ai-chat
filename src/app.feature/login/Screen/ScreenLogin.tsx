import Image from 'next/image';
import React from 'react';

import { ElButton, ElInput } from '@/components';

const ScreenLogin = () => {
  return (
    <React.Fragment>
      <div className="relative">
        <Image src="/logo.svg" alt="umble logo" fill priority />
      </div>
      <ElInput title="API KEY" />
      <ElButton>Login</ElButton>
    </React.Fragment>
  );
};

export default ScreenLogin;
