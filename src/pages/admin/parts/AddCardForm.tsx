import { useEffect, useState } from "react";
import Button from "../../../UI/button/Button";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { CardType } from "../../../store/userSlice";
import {
  addQuestion,
  fuzzyQSearch,
  loadQFalse,
  loadQTrue,
} from "../../../store/questionsSlice";
import {
  addAnswer,
  fuzzyASearch,
  loadAFalse,
  loadATrue,
} from "../../../store/answersSlice";
import Textarea from "../../../UI/textarea/Textarea";
import { toast } from "react-toastify";
import Form from "../../../UI/form/Form";

let timer: NodeJS.Timeout;

export default function AddCardForm() {
  const [text, setText] = useState<string>("");
  const [searchParams] = useSearchParams();
  const cardType = searchParams.get("cardType") as CardType;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardType) {
      clearTimeout(timer);
      const search = cardType === "answers" ? fuzzyASearch : fuzzyQSearch;
      const loadTrue = cardType === "answers" ? loadATrue : loadQTrue;
      const loadFalse = cardType === "answers" ? loadAFalse : loadQFalse;
      if (text === "") {
        dispatch(search(text));
        dispatch(loadFalse());
        return;
      }

      dispatch(loadTrue());
      timer = setTimeout(() => {
        dispatch(search(text));
        dispatch(loadFalse());
      }, 1000);
    }
  }, [text, cardType]);

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const submit = () => {
    if (text === "") {
      if (toast.isActive("WriteText")) return;
      return toast("Впишіть спершу текст!", {
        type: "warning",
        toastId: "WriteText",
        autoClose: 1000,
      });
    }
    if (cardType === "questions") {
      dispatch(addQuestion({ text }));
    }
    if (cardType === "answers") {
      dispatch(addAnswer({ text }));
    }
    reset();
  };

  const reset = () => {
    setText("");
  };

  return (
    <>
      {cardType && (
        <Form className='card-form' submit={submit}>
          <Textarea value={text} onChange={handleChange} />
          <div className='btns-group'>
            <Button title='Додати картку' onClick={submit} />
            {text && <Button title='Скасувати' onClick={reset} />}
          </div>
        </Form>
      )}
    </>
  );
}
