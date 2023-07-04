import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { socketIo } from "../../../api/socket";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setJudge } from "../../../store/playerSlice";
import PlayerSidebarActions from "./PlayerSidebarActions";
import Sidebar from "../../../UI/sidebar/Sidebar";

export default function PlayerSidebar() {
  const [closed, setClosed] = useState<boolean>(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const judge = useAppSelector((state) => state.player.judge);

  useEffect(() => {
    socketIo.on("update_players", (data) => {
      setPlayers(data);
    });

    socketIo.on("update_judge", (currentJudge) => {
      dispatch(setJudge(currentJudge));
      setIsGameStart(true);
    });
  }, []);

  const trigger = () => {
    setClosed((prev) => !prev);
  };

  return (
    <Sidebar>
      {!isGameStart ? <PlayerSidebarActions /> : <></>}
      <div className='sidebar-judge'>
        {isGameStart && (
          <span className='fs-md fw-400'>
            Суддя: <span className='fw-600'>{judge}</span>
          </span>
        )}
      </div>
      <div className='sidebar-playerlist'>
        {players.map((player: any) => {
          return (
            <div className='sidebar-playerlist-player' key={player.id}>
              <span>{player.name}: </span>
              {player.ready && <span>готовий</span>}
              {player.result && <span>{player.result}</span>}
            </div>
          );
        })}
      </div>
    </Sidebar>
  );
}
