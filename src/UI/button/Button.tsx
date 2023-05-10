import "./styles.scss";

interface ButtonProps {
  title: string;
  theme?: "primary" | "secondary";
  onClick: () => void;
}

export default function Button({
  title,
  onClick,
  theme = "primary",
}: ButtonProps) {
  return (
    <div onClick={onClick} className={`button ${theme}`}>
      {title}
    </div>
  );
}
