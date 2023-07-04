import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socketIo } from "../../api/socket";
import Button from "../../UI/button/Button";

import links from "../../routes/links.json";

import "./styles/styles.scss";

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    socketIo.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return (
    <div className='main-wrapper'>
      <div className='header'>
        <h1>Картковий бій</h1>
      </div>
      <div className='menu-btns'>
        <Button
          title='Гра'
          onClick={() => {
            navigate(links.game.path);
          }}
        />
        <Button
          title='Адмін'
          onClick={() => {
            navigate(links.admin.path);
          }}
        />
      </div>
    </div>
  );
}
