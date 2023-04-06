interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value: string;
  _onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ElInput = ({ title, value, _onChange }: ElInputProps) => {
  return (
    <div>
      <label className="block text-24 leading-30 text-textDefault">
        {title}
      </label>
      <input type="text" value={value} onChange={_onChange} />
    </div>
  );
};

export default ElInput;
