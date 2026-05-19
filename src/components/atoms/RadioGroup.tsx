import clsx from 'clsx';

import { tw } from '@/utils/string';

interface RadioGroupProps {
  className?: string;
  label: string;
  name: string;
  schema: (string | number)[];
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const baseClassName = tw`inline-flex flex-col`;

const RadioGroup = ({ className, label, name, schema, value, onChange }: RadioGroupProps) => {
  const style = clsx(baseClassName, className);

  return (
    <fieldset className={style}>
      <legend className="ml-1.5 w-fit rounded-t-xl border-x-2 border-t-2 border-white bg-mauve-800 px-2.5 py-0.5 text-lg font-semibold text-white shadow-md shadow-zinc-200/10">
        {label}
      </legend>
      <div className="flex items-center justify-between rounded-tl-md rounded-tr-xl rounded-b-xl border-2 border-white bg-mauve-800 px-4 py-2 text-white shadow-md shadow-zinc-200/10">
        {schema.map((val) => (
          <div key={val} className="flex items-center gap-1">
            <input
              id={`radio-${name}-${val}`}
              name={name}
              type="radio"
              value={val}
              checked={val === value}
              onChange={onChange}
            />
            <label htmlFor={`radio-${name}-${val}`} className="font-semibold text-white">
              {val}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
