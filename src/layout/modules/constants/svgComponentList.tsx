import Back from 'public/images/icon-back.svg';
import Plus from 'public/images/icon-plus.svg';
import Logo from 'public/images/logo-white.svg';

import { useNavigation } from '@/hooks';
import PAGES_HREF from '@/types/PageHref';

const SVG_COMPONENT_LIST: {
  [pathname: string]: React.ReactElement<React.SVGProps<SVGSVGElement>>[];
} = {
  '/main': [
    <Logo key="logo" onClick={() => useNavigation().push(PAGES_HREF.MAIN)} />,
    <Plus key="plus" />,
  ],
  '/chat': [
    <Back key="back" onClick={() => useNavigation().push(PAGES_HREF.MAIN)} />,
  ],
};

export default SVG_COMPONENT_LIST;
