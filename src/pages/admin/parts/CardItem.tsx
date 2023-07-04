import { useEffect, useState } from "react";
import { Card } from "../../game/parts/GameField";
import Button from "../../../UI/button/Button";
import { useAppDispatch } from "../../../store/hooks";
import { useSearchParams } from "react-router-dom";
import { CardType } from "../../../store/userSlice";
import { deleteQuestion, updateQuestion } from "../../../store/questionsSlice";
import { deleteAnswer, updateAnswer } from "../../../store/answersSlice";
import Textarea from "../../../UI/textarea/Textarea";

const countTextFontSize = (textLength: number): number => {
  if (200 < textLength && textLength < 250) return 14;
  if (textLength > 250) return 12;
  return 18;
};

export default function CardItem({ card }: { card: Card }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("cardType") as CardType;
  const [editValue, setEditValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditValue(card.text);
    setIsEdit(false);
  }, [search]);

  const reset = () => {
    setIsEdit(false);
    setEditValue(card.text);
  };
  const edit = () => setIsEdit(true);

  const remove = () => {
    if (search === "questions") {
      dispatch(deleteQuestion(card.id));
    }
    if (search === "answers") {
      dispatch(deleteAnswer(card.id));
    }
  };

  const submit = () => {
    if (editValue === "") return;
    if (search === "questions") {
      dispatch(updateQuestion({ text: editValue, cardId: card.id }));
    }
    if (search === "answers") {
      dispatch(updateAnswer({ text: editValue, cardId: card.id }));
    }
    setIsEdit(false);
  };
  return (
    <li className='card-item fs-xs'>
      {!isEdit && (
        <p style={{ fontSize: countTextFontSize(card.text.length) }}>
          {card.text}
        </p>
      )}
      {isEdit && (
        <Textarea
          size='xs'
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      )}
      <div className='btns-group'>
        <Button
          onClick={isEdit ? submit : edit}
          title={isEdit ? "оновити" : "редагувати"}
          size='xs'
        />
        <Button
          onClick={isEdit ? reset : remove}
          title={isEdit ? "скасувати" : "видалити"}
          theme='danger'
          size='xs'
        />
      </div>
    </li>
  );
}
