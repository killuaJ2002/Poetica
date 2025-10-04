import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PoemPage from "./pages/PoemPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes - Outside MainLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Main Application Routes - Inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Redirect root to /poems */}
          <Route index element={<Navigate to="/poems" replace />} />

          {/* Main poems feed */}
          <Route path="poems" element={<HomePage />} />
          <Route
            path="/poems/:id"
            element={
              <ProtectedRoute>
                <PoemPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
