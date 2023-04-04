import Image from 'next/image';

import { ElButton, ElInput } from '@/components';

const ScreenLogin = () => {
  return (
    <section>
      <Image src="/logo.svg" alt="umble logo" priority />
      <ElInput title="API KEY" />
      <ElButton>login</ElButton>
    </section>
  );
};

export default ScreenLogin;
