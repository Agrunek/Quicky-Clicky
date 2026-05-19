import clsx from 'clsx';

import { tw } from '@/utils/string';

interface InputProps {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const baseClassName = tw`inline-flex flex-col`;

const Input = ({ type, label, name, value, onChange, className }: InputProps) => {
  const style = clsx(baseClassName, className);

  return (
    <div className={style}>
      <label
        htmlFor={`input-${name}`}
        className="ml-1.5 w-fit rounded-t-xl border-x-2 border-t-2 border-white bg-mauve-800 px-2.5 py-0.5 text-lg font-semibold text-white shadow-md shadow-zinc-200/10"
      >
        {label}
      </label>
      <input
        id={`input-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-tl-md rounded-tr-xl rounded-b-xl border-2 border-white bg-mauve-800 px-4 py-2 text-white shadow-md shadow-zinc-200/10"
      />
    </div>
  );
};

export default Input;
