import clsx from 'clsx';

import { tw } from '@/utils/string';

interface InputProps {
  className?: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  value: number | string;
}

const baseClassName = tw`inline-flex flex-col`;

const Input = ({ className, label, name, onChange, type, value }: InputProps) => {
  const style = clsx(baseClassName, className);

  return (
    <div className={style}>
      <label
        htmlFor={`input-${name}`}
        className="mb-1 ml-1 w-fit text-xs font-bold tracking-[0.12em] text-app-label uppercase"
      >
        {label}
      </label>
      <input
        id={`input-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="min-h-12 rounded-2xl border border-app-border bg-app-control px-4 py-3 text-app-ink shadow-sm transition placeholder:text-app-placeholder focus:border-app-accent focus:ring-4 focus:ring-app-accent/15 focus:outline-none"
      />
    </div>
  );
};

export default Input;
