interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ElButton = ({ children }: ElButtonProps) => {
  return <button>{children}</button>;
};

export default ElButton;
