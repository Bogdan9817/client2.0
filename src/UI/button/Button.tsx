import { useEffect, useState } from "react";
import "./styles.scss";

interface ButtonProps {
  title: string;
  theme?: "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  onClick: () => void;
}

export default function Button({
  title,
  onClick,
  theme,
  size = "sm",
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [styles, setStyles] = useState<any>({});
  const [ripple, setRipple] = useState(false);
  const mouseDown = () => {
    setPressed(true);
  };

  const mouseUp = () => {
    setPressed(false);
  };

  const handleClick = (e: any) => {
    const diameter = Math.max(e.target.clientWidth, e.target.clientHeight);
    const radius = diameter / 2;
    console.log(window.scrollX);
    setStyles({
      top:
        e.clientY -
        (e.target.getBoundingClientRect().top + window.scrollY) -
        radius,
      left:
        e.clientX -
        (e.target.getBoundingClientRect().left + window.screenX) -
        radius,
      width: diameter,
      height: diameter,
    });
    setRipple(true);

    setTimeout(() => {
      setRipple(false);
    }, 1000);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      aria-label={title}
      role='button'
      className={`button fs-${size} fw-400 ${pressed ? "pressed" : ""} ${
        theme ? theme : ""
      }`}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    >
      {title}

      {ripple && <span style={styles} className='ripple'></span>}
    </div>
  );
}
