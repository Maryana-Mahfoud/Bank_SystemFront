//this component is used to protect routes 
// that require authentication. It checks if the user is authenticated by looking for a token
// in localStorage. If the token is not found, it redirects the user to the login page. 
// If the token is found, it allows the user to access 
// the protected route. The AdminRoute component checks if the user has
//  an admin role and redirects accordingly, while the GuestRoute component 
// redirects authenticated users away from guest-only pages.

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; 

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // isAuthenticated is obtained from the authentication context using the useAuth hook.
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
}
//function AdminRoute checks if the user is authenticated and has an admin role.
//  If not authenticated, it redirects to the login page. If authenticated but not an admin,
//  it redirects to the dashboard. If both conditions are met, it renders the children components.
export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
    
    return <>{children}</>;
}
//function GuestRoute checks if the user is authenticated.
//  If authenticated, it redirects to the appropriate dashboard based on the user's role 
// (admin or regular user). If not authenticated, it renders the children components, 
// allowing access to guest-only pages.
export function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth();
    
    if (isAuthenticated) {
        return user?.role === "admin" 
            ? <Navigate to="/admin/dashboard" replace /> 
            : <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
}