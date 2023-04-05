interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  _onClick: () => Promise<void>;
}

const ElButton = ({ children, _onClick }: ElButtonProps) => {
  return (
    <button
      className="w-full rounded-5 bg-primary text-28 leading-75 text-bgDefault"
      onClick={_onClick}
    >
      {children}
    </button>
  );
};

export default ElButton;
