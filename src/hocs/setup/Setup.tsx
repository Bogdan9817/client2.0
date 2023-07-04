import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketIo } from "../../api/socket";
import RadioGroup from "../../UI/radiogroup/RadioGroup";
import Counter from "../../UI/counter/Counter";
import Checker from "../../UI/checker/Checker";
import Button from "../../UI/button/Button";
import ToHome from "../../UI/to-home/ToHome";

import data from "./data.json";

import "./styles/setup.scss";
import Form from "../../UI/form/Form";

export default function Setup() {
  const [playersLimit, setPlayersLimit] = useState<number>(3);
  const [sessionType, setSessionType] = useState<string>("public");
  const navigate = useNavigate();

  const counterLimitChange = (limit: number) => {
    setPlayersLimit(limit);
  };

  const handleCreateSession = async () => {
    const gameSettings = {
      playersLimit,
      sessionType,
    };
    socketIo.connect();
    socketIo.emit("create_room", gameSettings);
    socketIo.on("room_id", (roomId: string) => {
      navigate(`${roomId}`);
    });
  };

  return (
    <div className='container'>
      <Form withClose submit={handleCreateSession}>
        <h3>{data.heading}</h3>
        <Counter
          label='Кількість гравців'
          onChange={counterLimitChange}
          min={3}
          max={8}
        />
        <Button title='Створити' onClick={handleCreateSession} />
      </Form>
    </div>
  );
}
