import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { socketIo } from "../../api/socket";
import withPlayerJoin from "../../hocs/player-join/withPlayerJoin";
import withSetup from "../../hocs/setup/withSetup";
import PlayerSidebar from "./parts/PlayerSidebar";
import GameField from "./parts/GameField";
import GameOver from "./parts/GameOver";
import "./styles/styles.scss";

export interface PlayerInfo {
  name: string;
  playerId: string;
  result: number;
}

function Game() {
  const [over, setOver] = useState<boolean>(false);
  const [results, setResults] = useState<PlayerInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socketIo.on("socket_alert", (data: string) => {
      toast(data, {
        type: "error",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      });
    });
    socketIo.on("game_alert", (data: string) => {
      toast(data, {
        type: "warning",
        autoClose: 1000,
      });
    });
    socketIo.on("game_over", (data: any[]) => {
      setOver(true);
      setResults(data);
    });
  }, [navigate]);

  return (
    <div className='game-wrapper'>
      <PlayerSidebar />
      {over ? <GameOver info={results} /> : <GameField />}
    </div>
  );
}

export default withSetup(withPlayerJoin(Game));
