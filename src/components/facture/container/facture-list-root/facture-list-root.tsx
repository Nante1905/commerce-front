import { useEffect, useState } from "react";
import { Facture } from "../../../shared/types/model.types";
import FactureListComponent from "../../components/facture-list/facture-list";
import { findAllFactures } from "../../services/facture.service";

const FactureListRoot = () => {
  document.title = "Liste des factures";

  const [state, setState] = useState<FactureListRootState>(initialState);

  useEffect(() => {
    findAllFactures()
      .then((res) => {
        setState((state) => ({
          ...state,
          factures: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <FactureListComponent factures={state.factures} />
    </div>
  );
};

export default FactureListRoot;

interface FactureListRootState {
  factures: Facture[];
}

const initialState: FactureListRootState = {
  factures: [],
};
