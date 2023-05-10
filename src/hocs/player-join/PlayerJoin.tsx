import { useEffect, useState } from "react";
import InputField from "../../UI/input/InputField";
import Button from "../../UI/button/Button";
import { useAppDispatch } from "../../store/hooks";
import { setPlayerName } from "../../store/playerSlice";
import "./styles/player-join.scss";
import { useParams } from "react-router-dom";
import { socketIo } from "../../api/socket";
import ToHome from "../../UI/to-home/ToHome";

export default function PlayerJoin() {
  const [name, setName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const { roomId } = useParams();

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const submitPlayerName = () => {
    dispatch(setPlayerName(name));
    if (roomId) {
      socketIo.emit("join_room", { roomId, name });
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <ToHome />
      <div className={`player-join hidden ${show ? "show" : ""}`}>
        <InputField
          label="Введіть ім'я"
          value={name}
          onChange={handleChange}
          id='playerName'
        />
        <Button onClick={submitPlayerName} title="Підтвердити ім'я" />
      </div>
    </>
  );
}
