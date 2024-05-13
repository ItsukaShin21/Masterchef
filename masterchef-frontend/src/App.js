import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/authProvider';
import PrivateRoute from './components/privateRoutes';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';
import RecipeItemPage from './pages/recipeItemPage';

function App() {
 return (
 <Router>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='/login' element={
              <PrivateRoute>
                <LoginPage />
              </PrivateRoute>
            } />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path='/view-recipe/:recipeId' element={<RecipeItemPage />}/>
        </Routes>
    </AuthProvider>
 </Router>
 );
}

export default App;
