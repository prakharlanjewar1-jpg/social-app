import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import RightSidebar from "../components/layout/RightSidebar/RightSidebar";

import "./MainLayout.css";

function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="feed">
          <Outlet />
        </main>

        <RightSidebar />

      </div>
    </>
  );
}

export default MainLayout;