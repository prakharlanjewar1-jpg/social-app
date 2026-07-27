import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

function AppRoutes() {
  return (
    <Routes>

      {/* Auth */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;