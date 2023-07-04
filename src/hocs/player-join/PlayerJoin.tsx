import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socketIo } from "../../api/socket";
import { useAppDispatch } from "../../store/hooks";
import { setPlayerName } from "../../store/playerSlice";
import InputField from "../../UI/input/InputField";
import Button from "../../UI/button/Button";
import ToHome from "../../UI/to-home/ToHome";

import "./styles/player-join.scss";
import Form from "../../UI/form/Form";

export default function PlayerJoin() {
  const [name, setName] = useState<string>("");
  const { roomId } = useParams();

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const submitPlayerName = () => {
    dispatch(setPlayerName(name));
    !socketIo.connected && socketIo.connect();
    if (roomId) {
      socketIo.emit("join_room", { roomId, name });
    }
  };

  return (
    <Form submit={submitPlayerName} withClose>
      <InputField
        label="Введіть ім'я"
        value={name}
        onChange={handleChange}
        id='playerName'
      />
      <Button onClick={submitPlayerName} title="Підтвердити ім'я" />
    </Form>
  );
}
