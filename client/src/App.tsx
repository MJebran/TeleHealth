import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import DetailPage from "./components/DetailPage";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { InventoryProvider } from "./context/InventoryContext";
import { ToastProvider } from "./context/ToastProvider";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import "./Style/style.scss";
import { AuthRequired } from "./components/auth/AuthRequired";

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
      <InventoryProvider>
        <ToastProvider>
          <Router>
            <Navbar />
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/item/:id" element={<DetailPage />} />
                <Route
                  path="/about/:id"
                  element={
                    <AuthRequired>
                      <AboutPage />
                    </AuthRequired>
                  }
                />
              </Routes>
            </ErrorBoundary>
          </Router>
        </ToastProvider>
      </InventoryProvider>
    </QueryClientProvider>
  );
};

export default App;
