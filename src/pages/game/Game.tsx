import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { socketIo } from "../../api/socket";
import withPlayerJoin from "../../hocs/player-join/withPlayerJoin";
import withSetup from "../../hocs/setup/withSetup";
import PlayerSidebar from "./parts/PlayerSidebar";
import GameField from "./parts/GameField";

import "./styles/styles.scss";

function Game() {
  const navigate = useNavigate();
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

  return (
    <div className='game-wrapper'>
      <PlayerSidebar />
      <GameField />
    </div>
  );
}

export default withSetup(withPlayerJoin(Game));
