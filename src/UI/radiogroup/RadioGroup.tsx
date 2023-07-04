import { useState } from "react";
import { FiCircle, FiTarget } from "react-icons/fi";
import "./styles.scss";

interface RadioGroupValue {
  value: string;
  label: string;
  id: string;
}

interface RadioGroupProps {
  values: RadioGroupValue[];
  onChange: (val: string) => void;
}

export default function RadioGroup({ values, onChange }: RadioGroupProps) {
  const [value, setValue] = useState<RadioGroupValue>();

  const handleClick = (val: RadioGroupValue) => {
    setValue(val);
    onChange(val.value);
  };

  return (
    <div aria-label='radio-group' className='radiogroup'>
      {values.map((val: RadioGroupValue) => {
        return (
          <div
            className='radiogroup-value'
            onClick={() => {
              handleClick(val);
            }}
            key={val.id}
          >
            <label htmlFor={val.id} className='fs-sm fw-500'>
              {val.label}
            </label>
            <span id={val.id}>
              {value?.id === val.id ? (
                <FiTarget size={24} />
              ) : (
                <FiCircle size={24} />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
