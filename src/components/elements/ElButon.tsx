interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin: string;
  children: React.ReactNode;
  _onClick: () => void;
}

const ElButton = ({ margin, children, _onClick }: ElButtonProps) => {
  return (
    <button
      className={`${margin} w-full rounded-5 bg-primary text-28 leading-72 text-bgDefault`}
      onClick={_onClick}
    >
      {children}
    </button>
  );
};

export default ElButton;
