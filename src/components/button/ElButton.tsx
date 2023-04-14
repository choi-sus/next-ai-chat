interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'button';
  margin?: string;
  children: React.ReactNode;
  _onClick?: () => void;
  sx?: boolean;
  del?: boolean;
}

const ElButton = ({
  type,
  margin,
  children,
  _onClick,
  sx,
  del,
}: ElButtonProps) => {
  if (sx)
    return (
      <button
        type={type}
        className={`${
          del ? 'bg-delete' : 'bg-primary'
        } ${margin} w-95 rounded-5 text-24 leading-50 text-bgDefault`}
        onClick={_onClick}
      >
        {children}
      </button>
    );

  return (
    <button
      type={type}
      className={`w-full bg-primary text-28
      leading-72 ${margin} rounded-5 text-bgDefault disabled:bg-slate-300 disabled:text-white`}
      onClick={_onClick}
    >
      {children}
    </button>
  );
};

export default ElButton;
