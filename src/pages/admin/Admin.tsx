import { Outlet } from "react-router-dom";
import withAuth from "../../hocs/auth/withAuth";
import AddCardForm from "./parts/AddCardForm";
import AdminSidebar from "./parts/AdminSidebar";

import "./styles/styles.scss";

function Admin() {
  return (
    <div className='admin-wrapper'>
      <AdminSidebar />
      <div className='admin-cardlist-container'>
        <AddCardForm />
        <Outlet />
      </div>
    </div>
  );
}

export default withAuth(Admin);
