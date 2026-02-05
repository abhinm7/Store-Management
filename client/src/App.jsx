import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute, PublicRoute } from "./components/RouterGuards";

import Signup from "./pages/Auth/Signup";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashboardHome from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Stores from "./pages/Admin/Store";
import ChangePassword from "./pages/Auth/ChangePassword";
import UserLayout from "./pages/User/UserLayout";
import UserDashboard from "./pages/User/UserDashboard";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import OwnerLayout from "./pages/Owner/OwnerLayout";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ADMIN Routes */}
        <Route element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="stores" element={<Stores />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* OWNER Routes */}
        <Route element={<ProtectedRoute allowedRoles={["STORE_OWNER"]} />}>
          <Route path="/owner" element={<OwnerLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* USER Routes */}
        <Route element={<ProtectedRoute allowedRoles={["NORMAL"]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
