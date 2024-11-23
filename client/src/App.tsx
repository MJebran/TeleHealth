import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AgreementsPage from "./pages/AgreementsPage";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ToastProvider } from "./context/ToastProvider";
import UserDetails from "./components/user/UserDetails";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import "./Style/style.scss";
import { AuthRequired } from "./components/auth/AuthRequired";
import RolesPage from "./pages/RolesPage";
import UserPage from "./pages/UserPage";
import { UserProvider } from "./context/UserContext"; // Import UserProvider

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
});

const App: React.FC = () => {
  const logError = (error: Error, info: React.ErrorInfo) => {
    console.error("Logging error:", error, info);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <Navbar />
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            <UserProvider> {/* Add UserProvider here */}
              <Routes>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/about/:id"
                  element={
                    <AuthRequired>
                      <AboutPage />
                    </AuthRequired>
                  }
                />
                <Route path="/agreements" element={<AgreementsPage />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/users/:id" element={<UserDetails />} />
              </Routes>
            </UserProvider>
          </ErrorBoundary>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
