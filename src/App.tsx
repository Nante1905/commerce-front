import { useEffect } from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { authenticationActions } from "./components/authentication/store/authentication.reducer";
import { authenticationStore } from "./components/authentication/store/authentication.store";
import { httpClient } from "./components/shared/services/interceptor/axios.interceptor";
import SidebarRoot from "./components/sidebar/container/sidebar-root/sidebar-root.component";

interface AppProps {
  children: JSX.Element;
}

function App({ children }: AppProps) {
  const initUser = () => {
    httpClient
      .get("/employes/me")
      .then((res) => {
        authenticationStore.dispatch(
          authenticationActions.verifySuccess(res.data.data)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <>
      <Provider store={authenticationStore}>
        <SidebarRoot>{children}</SidebarRoot>
      </Provider>
    </>
  );
}

export default App;
