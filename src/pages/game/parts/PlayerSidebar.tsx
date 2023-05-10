import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setJudge } from "../../../store/playerSlice";
import { socketIo } from "../../../api/socket";
import PlayerSidebarActions from "./PlayerSidebarActions";

export default function PlayerSidebar() {
  const [closed, setClosed] = useState<boolean>(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const judge = useAppSelector((state) => state.player.judge);
  socketIo.on("player_joined", (data) => {
    setPlayers(data);
  });

  socketIo.on("player_updates_ready_state", (data) => {
    setPlayers(data);
  });

  socketIo.on(
    "players_update",
    ({ players, currentJudge, currentQuestion }) => {
      setPlayers(players);
      dispatch(setJudge(players[currentJudge].name));
      setJudge(currentJudge);
      setIsGameStart(!!currentQuestion);
    }
  );

  const trigger = () => {
    setClosed((prev) => !prev);
  };

  return (
    <div className={`player-sidebar ${closed ? "closed" : ""}`}>
      <div className='trigger-btn'>
        <div>
          <FaBars cursor={"pointer"} onClick={trigger} size={36} />
        </div>
      </div>
      <div className='sidebar-body'>
        {!isGameStart && <PlayerSidebarActions />}
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
              <div className='sidebar-playerlist-player' key={player.playerId}>
                <span>{player.name}: </span>
                {player.ready && <span>готовий</span>}
                {player.result && <span>{player.result}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
