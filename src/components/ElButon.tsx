interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ElButton = ({ children }: ElButtonProps) => {
  return (
    <button className="w-full rounded-5 bg-primary text-16 leading-75">
      {children}
    </button>
  );
};

export default ElButton;
