import { useState } from "react";
import { socketIo } from "../../../api/socket";
import AnswerCardList from "./AnswerCardList";

export type Card = {
  text: string;
  id: string;
};

export default function GameField() {
  const [currentQuestionCard, setCurrentQuestionCard] = useState<Card>();
  socketIo.on("question_card_update", (data: Card) => {
    setCurrentQuestionCard(data);
  });

  return (
    <div className='game-field'>
      <div className='question-card-sector'>
        <div className='question-card'>{currentQuestionCard?.text}</div>
      </div>
      <AnswerCardList />
    </div>
  );
}
