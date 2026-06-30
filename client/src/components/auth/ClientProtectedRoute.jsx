import { Navigate } from "react-router-dom";

function ClientProtectedRoute({ children }) {
  const token = localStorage.getItem("clientToken");

  if (!token) {
    return <Navigate to="/client/login" replace />;
  }

  return children;
}

export default ClientProtectedRoute;
