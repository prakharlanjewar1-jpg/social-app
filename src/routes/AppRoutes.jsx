import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Communities from "../pages/Communities/Communities";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import Search from "../pages/Search/Search";
import SavedPosts from "../pages/Savedposts/Savedposts";
import CreatePost from "../pages/CreatePost/CreatePost";
import MyPosts from "../pages/MyPosts/MyPosts";
import Friends from "../pages/Friends/Friends";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Public authentication pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Route>

      {/* Protected application pages */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/messages" element={<Messages />} />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
        <Route path="/search" element={<Search />} /> 
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/friends" element={<Friends />} />
      </Route>

      {/* Unknown URLs */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
