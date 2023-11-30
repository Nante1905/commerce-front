import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import DemandeDetailsRoot from "./components/demande/containers/demande-details-root/demande-details-root.component.tsx";
import DemandeFormRoot from "./components/demande/containers/demande-form-root/demande-form-root.component.tsx";
import { demandeStore } from "./components/demande/store/demande.store.ts";
import Title from "./components/title/title.component.tsx";
import "./index.css";
import DemandeNatureRoot from "./components/demande/containers/demande-nature-root/demande-nature-root.component.tsx";
import DemandeProformaRoot from "./components/proforma/containers/demande-proforma-root/demande-proforma-root.component.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Outlet />
      </App>
    ),
    children: [
      {
        path: "title",
        element: <Title text={"Insertion de besoin"} />,
      },
      {
        path: "demandes",
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
