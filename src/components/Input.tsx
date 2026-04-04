interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, label, name, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`input-${name}`} className="font-semibold text-white text-shadow-xs">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        onChange={onChange}
        className="rounded-md border border-black/50 bg-white px-2 py-1"
      />
    </div>
  );
};

export default Input;
