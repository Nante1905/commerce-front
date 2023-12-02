import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import "./App.scss";
import { authenticationActions } from "./components/authentication/store/authentication.reducer";
import {
  AuthenticationStore,
  authenticationStore,
} from "./components/authentication/store/authentication.store";
import { demandeStore } from "./components/demande/store/demande.store";
import { httpClient } from "./components/shared/services/interceptor/axios.interceptor";
import decodeToken from "./components/shared/services/jwt.service";
import SidebarRoot from "./components/sidebar/container/sidebar-root/sidebar-root.component";

interface AppProps {
  children: JSX.Element;
}

function App({ children }: AppProps) {
  const forbidden = useSelector(
    (state: AuthenticationStore) => state.authentication.forbidden
  );

  const initUser = () => {
    httpClient
      .get("/employes/me")
      .then((res) => {
        authenticationStore.dispatch(
          authenticationActions.verifySuccess({
            ...res.data.data,
            authorities: decodeToken().authorization,
          })
        );
        demandeStore.dispatch(
          authenticationActions.verifySuccess(res.data.data)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    initUser();
    console.log(forbidden);
  }, []);

  return (
    <>
      <Provider store={authenticationStore}>
        <SidebarRoot>{children}</SidebarRoot>
        <Snackbar open={forbidden}>
          <Alert
            severity="error"
            onClose={() => {
              authenticationStore.dispatch(
                authenticationActions.forbiddenClose()
              );
            }}
          >
            Ressources interdites
          </Alert>
        </Snackbar>
      </Provider>
    </>
  );
}

export default App;
