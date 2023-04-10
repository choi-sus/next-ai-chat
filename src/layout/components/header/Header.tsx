import { SVG_COMPONENT_LIST } from '@/layout/modules/constants';

const Header = ({ pathname }: { pathname: string }) => {
  return (
    <header
      className={`${
        pathname === 'main' ? 'justify-start' : 'justify-between'
      } flex items-center px-30 py-25`}
    >
      {SVG_COMPONENT_LIST[pathname][0]}
      {SVG_COMPONENT_LIST[pathname][1] ? (
        SVG_COMPONENT_LIST[pathname][1]
      ) : (
        <h2>타이틀</h2>
      )}
    </header>
  );
};

export default Header;
