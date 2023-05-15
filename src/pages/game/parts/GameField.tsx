import { useEffect, useState } from "react";
import { socketIo } from "../../../api/socket";
import AnswerCardList from "./AnswerCardList";
import Loader from "../../../UI/loader/Loader";

export type Card = {
  text: string;
  id: string;
};

export default function GameField() {
  const [currentQuestionCard, setCurrentQuestionCard] = useState<Card>();
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    socketIo.on("question_card_update", (data: Card) => {
      console.log(data);
      setCurrentQuestionCard(data);
    });
    socketIo.on("load_trigger", (data: boolean) => {
      setLoad(data);
    });
  }, []);

  return (
    <div className='game-field'>
      <div className='question-card-sector'>
        <div className='question-card'>{currentQuestionCard?.text}</div>
      </div>
      {load && <Loader />}
      <AnswerCardList />
    </div>
  );
}
