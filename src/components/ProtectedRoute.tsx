import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "../components/LoadingOverlay";

/**
 * Props interface for the ProtectedRoute component
 * @interface ProtectedRouteProps
 * @property {ReactNode} children - Child components to be rendered when authenticated
 * @property {string} [redirectPath] - Optional custom redirect path for unauthenticated users
 */
interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

/**
 * ProtectedRoute Component
 * Protects routes by checking authentication status and redirecting unauthorized users
 * 
 * @component
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <DashboardComponent />
 * </ProtectedRoute>
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
}) => {
  const location = useLocation();
  const { isAuthenticated, status } = useSelector((state: any) => state.user);

  // Show loading overlay while checking authentication status
  if (status === "loading") {
    return <LoadingOverlay />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default React.memo(ProtectedRoute);
