// 'use client';
// import { AuthProvider, AuthProviderProps } from 'react-oidc-context';


// const oidcConfig: AuthProviderProps = {
//   authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
//   client_id: "mustafa-client",
//   // redirect_uri: "http://localhost:3000/", // development
//   redirect_uri: "https://directory-mustafa.duckdns.org/", // production
//   // ...
//   onSigninCallback: async (user) => {
//     console.log("User signed in");
//     const newUrl = window.location.href.split("?")[0];
//     window.history.replaceState({}, document.title, newUrl);
//     console.log("Setting cookie", user?.access_token);
    
//     document.cookie = `jwt_token=${user?.access_token}; expires=${new Date(new Date().getTime() + (user?.expires_in ?? 300) * 1000).toUTCString()}`;
//     console.log(document.cookie);

//   },
//   onRemoveUser: async () =>{
//     document.cookie = `jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  
//   }
//   // ...
// };


// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
// }