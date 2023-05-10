import "./styles.scss";

export type InputFieldProps = {
  label: string;
  onChange: (e: { target: { value: string } }) => void;
  value: string;
  id?: string;
};

export default function InputField({
  label,
  onChange,
  value,
  id,
}: InputFieldProps) {
  return (
    <div className='input'>
      <label className='input-label' htmlFor={id}>
        {label}:
      </label>
      <input
        className='input-field'
        value={value}
        id={id}
        type='text'
        onChange={onChange}
      />
    </div>
  );
}
