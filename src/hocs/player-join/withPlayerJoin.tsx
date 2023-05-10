import { useAppSelector } from "../../store/hooks";
import PlayerJoin from "./PlayerJoin";

export default function withPlayerJoin(Element: () => JSX.Element) {
  return function WithPlayerJoin() {
    const playerName = useAppSelector((state) => state.player.playerName);

    if (!playerName) {
      return <PlayerJoin />;
    }
    return <Element />;
  };
}
