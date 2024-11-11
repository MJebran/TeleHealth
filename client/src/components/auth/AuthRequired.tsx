import { FC, ReactNode } from "react";
import { useAuth } from "react-oidc-context";

export const AuthRequired: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    console.log(auth.user);
    return (
      <div>
        <div>
          Hello {auth.user?.profile.sub}{" "}
          <button onClick={() => void auth.removeUser()}>Log out</button>
        </div>
        {children}
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
};