interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
  title?: string;
  name?: string;
  value: string;
  placeholder: string;
  _onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  _onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  button?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const ElInput = ({
  margin,
  title,
  value,
  name,
  _onChange,
  _onKeyPress,
  placeholder,
  button,
}: ElInputProps) => {
  return (
    <div className={`${margin}`}>
      {title && (
        <label className="block text-24 leading-55 text-white">{title}</label>
      )}
      <input
        className="w-full rounded-5 border-2 border-notFocus  bg-bgDefault px-25 text-24 leading-72 text-white placeholder:text-20 focus:border-white focus:outline-none"
        type="text"
        value={value}
        name={name}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
        placeholder={placeholder}
      />
      {button && button}
    </div>
  );
};

export default ElInput;
