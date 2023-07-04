import { FiX } from "react-icons/fi";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
interface FormProps {
  children: JSX.Element[];
  submit: () => void;
  withClose?: boolean;
  className?: string;
}

export default function Form({
  children,
  submit,
  withClose = false,
  className = "",
}: FormProps) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit();
  };

  const close = () => {
    setShow(false);
    setTimeout(() => {
      navigate("../");
    }, 400);
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <form
      className={`form ${className} ${show ? "show" : ""}`}
      onSubmit={handleSubmit}
    >
      {withClose && (
        <FiX className='back' size={36} cursor='pointer' onClick={close} />
      )}
      {children}
      <input type='submit' />
    </form>
  );
}
