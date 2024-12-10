import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

interface UserProfile {
  realm_access?: {
    roles?: string[];
  };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  const profile = auth.user?.profile as UserProfile;
  const roles = profile?.realm_access?.roles || [];

  console.log("Roles from token:", roles); // Debugging roles

  if (!allowedRoles) {
    return auth.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.some((role) => roles.includes(role));
  if (!auth.isAuthenticated || !hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
