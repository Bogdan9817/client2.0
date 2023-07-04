import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CardItem from "./CardItem";
import { Card } from "../../game/parts/GameField";
import { fetchAnswersCard } from "../../../store/answersSlice";
import { fetchQuestionsCard } from "../../../store/questionsSlice";
import Loader from "../../../UI/loader/Loader";

export default function CardList() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("cardType") as "answers" | "questions";
  const { filtered, load, list } = useAppSelector((state) => state[search]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (search === "answers" && list === null) {
      dispatch(fetchAnswersCard());
    }
    if (search === "questions" && list === null) {
      dispatch(fetchQuestionsCard());
    }
  }, [search]);

  return (
    <>
      {load && <Loader />}
      {filtered && !load && (
        <ul className='cardlist'>
          {filtered.map((c: Card) => {
            return <CardItem key={c.id} card={c} />;
          })}
        </ul>
      )}
    </>
  );
}
