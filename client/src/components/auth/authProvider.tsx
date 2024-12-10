import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse-ts.duckdns.org/realms/mustafa/",
  client_id: "telehealth",
  redirect_uri: import.meta.env.DEV
    ? "http://localhost:5173/"
    : "https://telehealth.duckdns.org/",
  automaticSilentRenew: true,
  onSigninCallback: async (user) => {
    const newUrl = window.location.href.split("?")[0];
    window.history.replaceState({}, document.title, newUrl);
    document.cookie = `jwt_token=${user?.access_token}; expires=${new Date(
      new Date().getTime() + (user?.expires_in ?? 300) * 1000
    ).toUTCString()}`;
  },
  onRemoveUser: async () => {
    document.cookie = `jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    window.location.replace("/login");
  },
};

export const AuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
