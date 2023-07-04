import { useState } from "react";
import "./styles.scss";

type CounterProps = {
  min: number;
  max: number;
  onChange: (val: number) => void;
  label: string;
};

export default function Counter({ min, max, onChange, label }: CounterProps) {
  const [value, setValue] = useState<number>(min);

  const increment = () => {
    if (value === max) return;
    setValue(value + 1);
    onChange(value + 1);
  };

  const decrement = () => {
    if (value === min) return;
    setValue(value - 1);
    onChange(value - 1);
  };

  const mouseDown = (e: any) => {
    e.target.classList.add("pressed");
  };

  const mouseUp = (e: any) => {
    e.target.classList.remove("pressed");
  };

  return (
    <div aria-label={label} className='counter-container'>
      <span className='counter-label fs-sm'>{label}</span>
      <div className='counter'>
        <span
          className={`counter-btn ${value === min ? "disabled" : ""}`}
          onClick={decrement}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          aria-label='decrement button'
        >
          -
        </span>
        <span
          className='counter-value'
          aria-label={`${label} value is ${value}`}
        >
          {value}
        </span>
        <span
          className={`counter-btn ${value === max ? "disabled" : ""}`}
          onClick={increment}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          aria-label='increment button'
        >
          +
        </span>
      </div>
    </div>
  );
}
