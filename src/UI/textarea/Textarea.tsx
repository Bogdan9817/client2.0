import { useLayoutEffect, useRef, useState } from "react";
import "./styles.scss";

type TextareaProps = {
  onChange: (e: { target: { value: string } }) => void;
  value: string;
  id?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

const sizeObj = {
  xs: 12,
  sm: 24,
  md: 36,
  lg: 48,
};

export default function Textarea({
  onChange,
  value,
  id,
  size = "sm",
}: TextareaProps) {
  const [height, setHeight] = useState(sizeObj[size]);
  const ref = useRef(null);

  const handleChange = (e: any) => {
    if (
      e.nativeEvent.inputType === "insertLineBreak" ||
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      const lines = e.target.value.split("\n").length;
      setHeight(sizeObj[size] + lines * sizeObj[size]);
    }
    onChange(e);
  };

  useLayoutEffect(() => {
    // @ts-ignore
    setHeight(ref.current.scrollHeight);
  }, [ref.current]);

  return (
    <textarea
      style={{ height: height, padding: sizeObj[size] / 2 }}
      className={`textarea fs-${size}`}
      aria-label={value}
      value={value}
      id={id}
      ref={ref}
      onChange={handleChange}
    />
  );
}
