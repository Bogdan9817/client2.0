import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Admin from "../pages/admin/Admin";
import Game from "../pages/game/Game";
import Error from "../pages/error/Error";
import CardList from "../pages/admin/parts/CardList";

export type LinkType = {
  label: string;
  path: string;
  id: string;
};

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Main />,
  },
  {
    path: "/admin",
    errorElement: <Error />,
    element: <Admin />,
    children: [
      {
        path: "/admin/cardlist",
        element: <CardList />,
      },
    ],
  },
  {
    path: "/game",
    errorElement: <Error />,
    element: <Game />,
    children: [
      {
        path: "/game/:roomId",
        element: <Game />,
      },
    ],
  },
]);
