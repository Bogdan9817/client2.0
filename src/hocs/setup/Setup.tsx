import { useEffect, useState } from "react";
import Counter from "../../UI/counter/Counter";

import "./styles/setup.scss";
import Checker from "../../UI/checker/Checker";
import Button from "../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import RadioGroup from "../../UI/radiogroup/RadioGroup";
import { socketIo } from "../../api/socket";

import data from "./data.json";
import ToHome from "../../UI/to-home/ToHome";

export default function Setup() {
  const [playersLimit, setPlayersLimit] = useState<number>(3);
  const [sessionType, setSessionType] = useState<string>("public");
  const [sessionCardsOpts, setSessionCardsOpts] = useState<any>({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const counterLimitChange = (limit: number) => {
    setPlayersLimit(limit);
  };

  const handleCheck = (name: string, value: boolean) => {
    setSessionCardsOpts((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCreateSession = async () => {
    const gameSettings = {
      playersLimit,
      sessionType,
      sessionCardsOpts,
    };
    socketIo.emit("create_room", gameSettings);
    socketIo.on("get_roomId", (roomId: string) => {
      navigate(`${roomId}`);
    });
  };

  const handleGroupChange = (value: string) => {
    setSessionType(value);
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <ToHome />
      <div className={`setup-container hidden ${show ? "show" : ""}`}>
        <h2>{data.heading}</h2>
        <RadioGroup onChange={handleGroupChange} values={data.gameTypes} />
        <Counter
          label='Кількість гравців'
          onChange={counterLimitChange}
          min={3}
          max={8}
        />
        {data.cardsSettings.map((cardsSetting) => {
          return (
            <Checker
              onClick={handleCheck}
              {...cardsSetting}
              key={cardsSetting.id}
            />
          );
        })}
        <Button title='Створити' onClick={handleCreateSession} />
      </div>
    </>
  );
}
