import ToHome from "../../../UI/to-home/ToHome";
import { PlayerInfo } from "../Game";

export default function GameOver({ info }: { info: PlayerInfo[] }) {
  return (
    <div className='game-over'>
      {info.map((p: PlayerInfo) => {
        return (
          <div key={p.playerId}>
            <span>{p.name}: </span>
            <span className='fw-600'>{p.result}</span>
          </div>
        );
      })}
      <ToHome />
    </div>
  );
}
