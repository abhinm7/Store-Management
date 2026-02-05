import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { ProtectedRoute, PublicRoute } from "./components/RouterGuards";
import Signup from "./pages/Auth/Signup";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashboardHome from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Stores from "./pages/Admin/Store";
import ChangePassword from "./pages/Auth/ChangePassword";
import { Toaster } from "react-hot-toast";

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
          <Route path="/owner/*" element={<h1>Owner Dashboard Loaded</h1>} />
        </Route>

        {/* USER Routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["NORMAL", "SYSTEM_ADMIN"]} />}
        >
          <Route path="/user/*" element={<h1>User Dashboard Loaded</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
