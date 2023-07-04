import { useEffect, useState } from "react";
import { socketIo } from "../../../api/socket";
import { useAppSelector } from "../../../store/hooks";
import { Card } from "./GameField";
import Button from "../../../UI/button/Button";

export default function AnswerCardList() {
  const [answerCards, setAnswerCards] = useState<Card[]>([]);
  const [isPlayerChooseCard, setIsPlayerChooseCard] = useState<boolean>(true);
  const [isAlreadyChoose, setIsAlreadChoose] = useState<boolean>(false);
  const { playerName, judge } = useAppSelector((state) => state.player);

  useEffect(() => {
    socketIo.on("update_cards", (data: Card[]) => {
      console.log(data);
      setAnswerCards(data);
      setIsPlayerChooseCard(true);
      setIsAlreadChoose(false);
    });

    socketIo.on("round_answers", (data) => {
      setAnswerCards(data);
      setIsPlayerChooseCard(false);
    });
  }, []);

  const handlePlayerChoose = (card: Card) => {
    socketIo.emit("player_choose_answer", [card.id]);
    setIsAlreadChoose(true);
  };

  const handleJudgeChoose = (card: Card) => {
    socketIo.emit("judge_choose_answer", card.id);
  };

  return (
    <div className='answer-cards-sector'>
      {answerCards.map((card: any) => {
        return (
          <div className='card' key={card.id}>
            <div className='card-text'>{card.text}</div>
            {isPlayerChooseCard && playerName !== judge && !isAlreadyChoose && (
              <Button
                title='вибрати'
                onClick={() => {
                  handlePlayerChoose(card);
                }}
              />
            )}
            {!isPlayerChooseCard && playerName === judge && (
              <Button
                title='вибрати'
                onClick={() => {
                  handleJudgeChoose(card);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
