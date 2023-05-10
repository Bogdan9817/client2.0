import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

import "./styles.scss";

export default function ToHome() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/");
      }}
      className='navigate-to-home'
    >
      <span className='home-label hidden'>to home</span>
      <FiChevronLeft className='home-icon' size={36} />
    </div>
  );
}
