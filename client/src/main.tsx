import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { LoginButton } from './components/LoginButton.tsx';


const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "mustafa-vite",
  redirect_uri: "http://localhost:5173/",
  automaticSilentRenew: true, // Enables silent renew
  // loadUserInfo: true,   
  onSigninCallback: async (user) => {
    console.log("User signed in");
    const newUrl = window.location.href.split("?")[0];
    window.history.replaceState({}, document.title, newUrl);
    console.log("Setting cookie", user?.access_token);
    
    document.cookie = `jwt_token=${user?.access_token}; expires=${new Date(new Date().getTime() + (user?.expires_in ?? 300) * 1000).toUTCString()}`;
    console.log(document.cookie);

  },
  onRemoveUser: async () =>{
    document.cookie = `jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
  
  // ...
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <LoginButton />
    <App />
    </AuthProvider>
  </StrictMode>,
)
