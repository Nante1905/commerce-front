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
import BonLivraisonComponent from "./components/bon-livraison/components/bon-livraison/bon-livraison.tsx";
import BonLivraisonFromRoot from "./components/bon-livraison/container/bon-livraison-form-root/bon-livraison-form-root.tsx";
import BonLivraisonListRoot from "./components/bon-livraison/container/bon-livraison-list-root/bon-livraison-list-root.tsx";
import DemandeDetailsRoot from "./components/demande/containers/demande-details-root/demande-details-root.component.tsx";
import DemandeFormRoot from "./components/demande/containers/demande-form-root/demande-form-root.component.tsx";
import DemandeListRoot from "./components/demande/containers/demande-list-root/demande-list-root.component.tsx";
import DemandeNatureRoot from "./components/demande/containers/demande-nature-root/demande-nature-root.component.tsx";
import { demandeStore } from "./components/demande/store/demande.store.ts";
import AccuseReceptionFormRoot from "./components/dispatch/containers/accuse-reception-form/accuse-reception-form-root.component.tsx";
import DispatchListRoot from "./components/dispatch/containers/dispatch-list/dispatch-list-root.component.tsx";
import FactureDetailsRoot from "./components/facture/container/facture-details-root/facture-details-root.tsx";
import FactureFormRoot from "./components/facture/container/facture-form-root/facture-form-root.tsx";
import FactureListRoot from "./components/facture/container/facture-list-root/facture-list-root.tsx";
import ProformaReponseListComponent from "./components/proforma/components/proforma-reponse-list/proforma-reponse-list.tsx";
import DemandeProformaListRoot from "./components/proforma/containers/demande-proforma-list-root/demande-profoma-list-root.tsx";
import DemandeProformaRoot from "./components/proforma/containers/demande-proforma-root/demande-proforma-root.component.tsx";
import SaisieReponseProformaRoot from "./components/proforma/containers/saisie-reponse-proforma-root/saisie-reponse-proforma-root.tsx";
import BonReceptionFormRoot from "./components/reception/container/bon-reception-form-root/bon-reception-form-root.tsx";
import LoginProtection from "./components/shared/components/login-protection/LoginProtection.tsx";
import BonEntreListRoot from "./components/stock/containers/bon-entre-list/bon-entre-list-root.component.tsx";
import BonEntreRoot from "./components/stock/containers/bon-entre/bon-entre-root.component.tsx";
import BonSortieListRoot from "./components/stock/containers/bon-sortie-list/bon-sortie-list-root.component.tsx";
import BonSortieRoot from "./components/stock/containers/bon-sortie/bon-sortie-root.component.tsx";
import EntreStockFormRoot from "./components/stock/containers/entre-stock-form-root/entre-stock-form-root.component.tsx";
import EtatStockRoot from "./components/stock/containers/etat-stock-root/etat-stock-root.component.tsx";
import SortieStockRoot from "./components/stock/containers/sortie-stock-root/sortie-stock-root.component.tsx";
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
        path: "bon-livraison/saisie",
        element: <BonLivraisonFromRoot />,
      },
      {
        path: "etat-stock",
        element: <EtatStockRoot />,
      },
      {
        path: "bon-livraison/:id",
        element: <BonLivraisonComponent />,
      },
      {
        path: "bon-livraison",
        element: <BonLivraisonListRoot />,
      },
      {
        path: "facture/saisie",
        element: <FactureFormRoot />,
      },
      {
        path: "facture",
        element: <FactureListRoot />,
      },
      {
        path: "facture/:id",
        element: <FactureDetailsRoot />,
      },
      {
        path: "sortie-stock",
        element: <SortieStockRoot />,
      },
      {
        path: "bon-sortie",
        element: <BonSortieListRoot />,
      },
      {
        path: "bon-sortie/:id",
        element: <BonSortieRoot />,
      },
      {
        path: "entre-stock",
        element: <EntreStockFormRoot />,
      },
      {
        path: "bon-entree",
        element: <BonEntreListRoot />,
      },
      {
        path: "bon-entree/:id",
        element: <BonEntreRoot />,
      },
      {
        path: "dispatch",
        element: <DispatchListRoot />,
      },
      {
        path: "bon-sortie/:id/confirmation",
        element: <AccuseReceptionFormRoot />,
      },
      {
        path: "bon-reception/saisie",
        element: <BonReceptionFormRoot />,
      },
      {
        path: "/test",
        element: <></>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
