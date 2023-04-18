import Back from 'public/images/icon-back.svg';
import Plus from 'public/images/icon-plus.svg';
import Logo from 'public/images/logo-white.svg';

const HEADER_SVG_LIST: {
  [pathname: string]: React.ReactElement<React.SVGProps<SVGSVGElement>>[];
} = {
  main: [<Logo key="logo" />, <Plus key="plus" />],
  chat: [<Back key="back" />],
};

export default HEADER_SVG_LIST;
