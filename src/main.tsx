import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Title from "./components/title/title.component.tsx";
import DemandeFormRoot from "./components/demande/containers/demande-form-root/demande-form-root.component.tsx";
import { Provider } from "react-redux";
import { demandeStore } from "./components/demande/store/demande.store.ts";
import DemandeDetailsRoot from "./components/demande/containers/demande-details-root/demande-details-root.component.tsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
