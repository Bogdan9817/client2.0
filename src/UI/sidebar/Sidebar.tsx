import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./styles.scss";

export default function Sidebar({ children }: { children: JSX.Element[] }) {
  const [closed, setClosed] = useState<boolean>(true);

  const trigger = () => {
    setClosed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${closed ? "closed" : ""}`}>
      <div className='trigger-btn'>
        <div>
          <FaBars cursor={"pointer"} onClick={trigger} size={36} />
        </div>
      </div>
      <div className='sidebar-body'>{children}</div>
    </div>
  );
}
