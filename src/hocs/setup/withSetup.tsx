import { useParams } from "react-router-dom";
import Setup from "./Setup";

export default function withSetup(Element: () => JSX.Element) {
  return function WithSetup() {
    const { roomId } = useParams();

    if (!roomId) {
      return <Setup />;
    }
    return <Element />;
  };
}
