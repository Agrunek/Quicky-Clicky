import clsx from 'clsx';

import { tw } from '@/utils/string';

interface RadioGroupProps {
  className?: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  schema: (number | string)[];
  value?: number | string;
}

const baseClassName = tw`inline-flex flex-col`;

const RadioGroup = ({ className, label, name, onChange, schema, value }: RadioGroupProps) => {
  const style = clsx(baseClassName, className);

  return (
    <fieldset className={style}>
      <legend className="mb-1 ml-1 w-fit text-xs font-bold tracking-[0.12em] text-app-label uppercase">{label}</legend>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-app-border bg-app-control px-3 py-3 text-app-ink shadow-sm">
        {schema.map((val) => (
          <div key={val} className="flex items-center gap-2">
            <input
              id={`radio-${name}-${val}`}
              name={name}
              type="radio"
              value={val}
              checked={val === value}
              onChange={onChange}
              className="size-4 accent-app-accent-hover"
            />
            <label htmlFor={`radio-${name}-${val}`} className="cursor-pointer font-semibold">
              {val}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
