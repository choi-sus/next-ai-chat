interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  _onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ElInput = ({ title, _onChange }: ElInputProps) => {
  return (
    <div>
      <label className="block text-24 leading-30 text-textDefault">
        {title}
      </label>
      <input type="text" onChange={_onChange} />
    </div>
  );
};

export default ElInput;
