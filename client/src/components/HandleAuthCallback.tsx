import { FC, ReactNode } from "react";
import { useAuth } from "react-oidc-context";

export const HandleAuthCallback: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  return <>{children}</>;
};