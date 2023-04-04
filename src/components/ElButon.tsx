interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ElButton = ({ children }: ElButtonProps) => {
  return (
    <button className="w-full rounded-5 bg-primary text-28 leading-75 text-bgDefault">
      {children}
    </button>
  );
};

export default ElButton;
