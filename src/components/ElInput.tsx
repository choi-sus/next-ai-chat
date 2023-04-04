interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const ElInput = ({ title }: ElInputProps) => {
  return (
    <>
      <label>{title}</label>
      <input type="text" />
    </>
  );
};

export default ElInput;
