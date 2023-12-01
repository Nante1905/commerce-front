import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import SignIn from "./components/authentication/components/signin/SignIn.component.tsx";
import { authenticationStore } from "./components/authentication/store/authentication.store.ts";
import DemandeDetailsRoot from "./components/demande/containers/demande-details-root/demande-details-root.component.tsx";
import DemandeFormRoot from "./components/demande/containers/demande-form-root/demande-form-root.component.tsx";
import DemandeListRoot from "./components/demande/containers/demande-list-root/demande-list-root.component.tsx";
import DemandeNatureRoot from "./components/demande/containers/demande-nature-root/demande-nature-root.component.tsx";
import { demandeStore } from "./components/demande/store/demande.store.ts";
import DemandeProformaRoot from "./components/proforma/containers/demande-proforma-root/demande-proforma-root.component.tsx";
import LoginProtection from "./components/shared/components/login-protection/LoginProtection.tsx";
import Title from "./components/title/title.component.tsx";
import "./index.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <LoginProtection>
        <App>
          <Provider store={authenticationStore}>
            <Outlet />
          </Provider>
        </App>
      </LoginProtection>
    ),

    children: [
      {
        path: "/demandes",
        element: (
          <Provider store={demandeStore}>
            <DemandeListRoot />
          </Provider>
        ),
      },
      {
        path: "title",
        element: <Title text={"Insertion de besoin"} />,
      },
      {
        path: "demandes/create",
        element: (
          <Provider store={demandeStore}>
            <DemandeFormRoot />
          </Provider>
        ),
      },
      {
        path: "demandes/:id",
        element: <DemandeDetailsRoot />,
      },
      {
        path: "demandes/nature",
        element: (
          <Provider store={demandeStore}>
            <DemandeNatureRoot />
          </Provider>
        ),
      },
      {
        path: "proforma/demande",
        element: (
          <Provider store={demandeStore}>
            <DemandeProformaRoot />
          </Provider>
        ),
      },
      {
        path: "/test",
        element: <div>Test</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
