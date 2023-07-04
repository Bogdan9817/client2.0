import { useCookies } from "react-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../api/api";
import { HiLogout } from "react-icons/hi";
import Sidebar from "../../../UI/sidebar/Sidebar";

export default function AdminSidebar() {
  const [cookies, setCookie, removeCookie] = useCookies(["userRole", "userId"]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const logout = () => {
    api.post("/auth/signout");
    const date = new Date();
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    removeCookie("userRole", { path: "/" });
    removeCookie("userId", { path: "/" });
    navigate("/");
  };

  return (
    <Sidebar>
      <nav className='nav-tab'>
        <ul>
          <li
            className={`fs-sm ${
              searchParams.get("cardType") === "answers" ? "active" : ""
            }`}
          >
            <Link to='cardlist?cardType=answers'>Відповіді</Link>
          </li>
          <li
            className={`fs-sm ${
              searchParams.get("cardType") === "questions" ? "active" : ""
            }`}
          >
            <Link to='cardlist?cardType=questions'>Питання</Link>
          </li>
        </ul>
      </nav>

      <div className='logout-btn' onClick={logout}>
        <HiLogout size={24} />

        <span className='fs-sm'>Вийти</span>
      </div>
    </Sidebar>
  );
}
