interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const ElInput = ({ title }: ElInputProps) => {
  return (
    <div>
      <label className="block text-24 leading-30 text-textDefault">
        {title}
      </label>
      <input type="text" />
    </div>
  );
};

export default ElInput;
