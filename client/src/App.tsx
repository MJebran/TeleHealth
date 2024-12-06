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
import { UserProvider } from "./context/UserContext";
import HomePage from "./components/HomePage";
import ApplyPage from "./components/ApplyPage";
import ForPatientsPage from "./components/ForPatientsPage";
import ForDoctorsPage from "./components/ForDoctorsPage";
import ForScribeInternsPage from "./components/ForScribeInternsPage";
import CasePage from "./pages/CasePage";
import CaseDetail from "./components/case/CaseDetail";
import { CaseProvider } from "./context/CaseContext";

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
            <UserProvider>
            <CaseProvider>
              {" "}
              {/* Add UserProvider here */}
              <Routes>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about/:id" element={
                    <AuthRequired>
                      <AboutPage />
                    </AuthRequired>
                  }
                />
                <Route path="/agreements" element={<AgreementsPage />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/for-patients" element={<ForPatientsPage />} />
                <Route path="/for-doctors" element={<ForDoctorsPage />} />
                <Route path="/for-scribe-interns" element={<ForScribeInternsPage />} />
                <Route path="/cases" element={<CasePage />} />;
                <Route path="/cases/:id" element={<CaseDetail />} />;
              </Routes>
              </CaseProvider>
            </UserProvider>
          </ErrorBoundary>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
