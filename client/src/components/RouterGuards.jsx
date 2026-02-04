import { Navigate, Outlet } from 'react-router-dom';

const getDashboardPath = (role) => {
  switch (role) {
    case 'SYSTEM_ADMIN': return '/admin/dashboard';
    case 'STORE_OWNER': return '/owner/dashboard';
    case 'NORMAL': return '/user/dashboard';
    default: return '/';
  }
};

export const PublicRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token ? <Navigate to={getDashboardPath(role)} replace /> : <Outlet />;
};

export const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return <Outlet />;
};