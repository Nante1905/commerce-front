import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import SignIn from "./components/authentication/components/signin/SignIn.component.tsx";
import { authenticationStore } from "./components/authentication/store/authentication.store.ts";
import ListBonCommandeComponent from "./components/bon-de-commande/components/list-bon-commande/list-bon-commande.tsx";
import ValidateBonCommandeComponent from "./components/bon-de-commande/components/validate-bon-commande/validate-bon-commande.tsx";
import DetailsBonCommandeRoot from "./components/bon-de-commande/container/details-bon-commande-root.tsx";
import DemandeDetailsRoot from "./components/demande/containers/demande-details-root/demande-details-root.component.tsx";
import DemandeFormRoot from "./components/demande/containers/demande-form-root/demande-form-root.component.tsx";
import DemandeListRoot from "./components/demande/containers/demande-list-root/demande-list-root.component.tsx";
import DemandeNatureRoot from "./components/demande/containers/demande-nature-root/demande-nature-root.component.tsx";
import { demandeStore } from "./components/demande/store/demande.store.ts";
import ProformaReponseListComponent from "./components/proforma/components/proforma-reponse-list/proforma-reponse-list.tsx";
import DemandeProformaListRoot from "./components/proforma/containers/demande-proforma-list-root/demande-profoma-list-root.tsx";
import DemandeProformaRoot from "./components/proforma/containers/demande-proforma-root/demande-proforma-root.component.tsx";
import SaisieReponseProformaRoot from "./components/proforma/containers/saisie-reponse-proforma-root/saisie-reponse-proforma-root.tsx";
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
        <Provider store={authenticationStore}>
          <App>
            <Outlet />
          </App>
        </Provider>
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
        path: "proforma/demandes/sans-reponse",
        element: <DemandeProformaListRoot />,
      },
      {
        path: "proforma/demandes/avec-reponse",
        element: <ProformaReponseListComponent />,
      },
      {
        path: "proforma/:id/reponse",
        element: <SaisieReponseProformaRoot />,
      },
      {
        path: "bon-commandes",
        element: <ListBonCommandeComponent />,
      },
      {
        path: "bon-commandes/:id",
        element: <DetailsBonCommandeRoot />,
      },
      {
        path: "bon-commandes/:id/valider",
        element: <ValidateBonCommandeComponent />,
      },
      {
        path: "/test",
        element: (
          <>
            <ValidateBonCommandeComponent />
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
