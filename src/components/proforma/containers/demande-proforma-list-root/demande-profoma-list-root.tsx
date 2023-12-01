import { useEffect, useState } from "react";
import Title from "../../../title/title.component";
import DemandeProformaListComponent from "../../components/demande-proforma-list/demande-profoma-list";
import { findProformaSansReponse } from "../../services/proforma.service";
import { DemandeProformaDetails } from "../../types/proforma.types";
import "./demande-profoma-list-root.scss";

const DemandeProformaListRoot = () => {
  const [state, setState] =
    useState<DemandeProformaListRootState>(initialState);

  useEffect(() => {
    findProformaSansReponse()
      .then((res) => {
        setState((state) => ({
          ...state,
          demandes: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="demande-proforma-list-root">
      <header>
        <Title text={"Liste des demandes proforma"} />
        <h4>En attente de reponse</h4>
      </header>
      <DemandeProformaListComponent demandes={state.demandes} />
    </div>
  );
};

export default DemandeProformaListRoot;

interface DemandeProformaListRootState {
  demandes: DemandeProformaDetails[];
}

const initialState: DemandeProformaListRootState = {
  demandes: [],
};
