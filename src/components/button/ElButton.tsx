interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'button';
  margin: string;
  children: React.ReactNode;
  _onClick?: () => void;
}

const ElButton = ({ type, margin, children, _onClick }: ElButtonProps) => {
  return (
    <button
      type={type}
      className={`${margin} w-full rounded-5 bg-primary text-28 leading-72 text-bgDefault`}
      onClick={_onClick}
    >
      {children}
    </button>
  );
};

export default ElButton;
