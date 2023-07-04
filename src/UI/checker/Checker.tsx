import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import "./styles.scss";

type CheckerProps = {
  label: string;
  name: string;
  onClick: (name: string, value: boolean) => void;
};

export default function Checker({ label, name, onClick }: CheckerProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = () => {
    setChecked(!checked);
    onClick(name, !checked);
  };
  return (
    <div
      aria-label={name}
      role='checkbox'
      onClick={handleClick}
      className='checker'
    >
      <label className='checker-label fw-400 fs-sm'>{label}:</label>
      <span className='checker-state'>
        {checked ? <FiCheck size={24} /> : <FiX size={24} />}
      </span>
    </div>
  );
}
