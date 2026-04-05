interface CheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  onCheck: (check: boolean) => void;
}

const Checkbox = ({ label, name, checked, onCheck }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        name={name}
        id={`input-${name}`}
        checked={checked}
        onChange={(e) => onCheck(e.target.checked)}
        className="size-4 accent-violet-600"
      />
      <label htmlFor={`input-${name}`} className="mb-0.5 font-semibold text-white text-shadow-xs">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
