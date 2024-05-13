import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authProvider';

function PrivateRoute({ children }) {
 const { isAuthenticated } = useAuth();
 const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Redirect to login if trying to access a protected route
    if (location.pathname !== '/login') {
      return <Navigate to="/login" replace />;
    }
 }


 if (isAuthenticated && location.pathname === '/login') {
  return <Navigate to="/home" replace />;
 }

 // If authenticated, render the children
 return (
  <>
      {children}
  </>
);
}

export default PrivateRoute;