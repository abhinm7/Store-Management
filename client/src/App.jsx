import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { ProtectedRoute, PublicRoute } from "./components/RouterGuards";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ADMIN Routes */}
      <Route element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]} />}>
        <Route path="/admin/*" element={<h1>Admin Dashboard Loaded</h1>} />
      </Route>

      {/* OWNER Routes */}
      <Route element={<ProtectedRoute allowedRoles={["STORE_OWNER"]} />}>
        <Route path="/owner/*" element={<h1>Owner Dashboard Loaded</h1>} />
      </Route>

      {/* USER Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["NORMAL", "SYSTEM_ADMIN"]} />
        }
      >
        <Route path="/user/*" element={<h1>User Dashboard Loaded</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
