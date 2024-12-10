import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { useToast } from "../context/useToast";

const ErrorFallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();
  const { addToast } = useToast();

  useEffect(() => {
    addToast(`Error: ${error.message}`, "error");
  }, [error, addToast]);

  return (
    <div className="container mt-4" role="alert">
      <h2>Something went wrong:</h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ErrorFallback;
