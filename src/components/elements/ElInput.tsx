interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value: string;
  _onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  _onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ElInput = ({ title, value, _onChange, _onKeyPress }: ElInputProps) => {
  return (
    <div>
      <label className="block text-24 leading-55 text-white">{title}</label>
      <input
        className="w-full rounded-5 border-2 border-notFocus  bg-bgDefault px-25 text-24 leading-72 text-white focus:border-white focus:outline-none"
        type="text"
        value={value}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
      />
    </div>
  );
};

export default ElInput;
