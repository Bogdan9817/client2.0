import { useCookies } from "react-cookie";
import Auth from "./Auth";

export default function withAuth(Element: () => JSX.Element) {
  return function WithAuth() {
    const [cookies] = useCookies();
    if (!cookies.userId) {
      return <Auth />;
    }
    return <Element />;
  };
}
