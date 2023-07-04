import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.scss";

type InputFieldProps = {
  label?: string;
  onChange: (e: { target: { value: string } }) => void;
  value: string;
  id?: string;
  type?: "text" | "password";
};

export default function InputField({
  label,
  onChange,
  value,
  id,
  type = "text",
}: InputFieldProps) {
  return (
    <div role='input' className='input'>
      {label && (
        <label className='input-label fw-400 fs-sm' htmlFor={id}>
          {label}:
        </label>
      )}
      <input
        className='input-field fs-sm'
        value={value}
        id={id}
        onChange={onChange}
        role='textbox'
        type={type}
      />
    </div>
  );
}
