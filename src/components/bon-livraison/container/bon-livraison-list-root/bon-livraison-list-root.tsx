import { useEffect, useState } from "react";
import { BonLivraison } from "../../../shared/types/model.types";
import BonLivraisonListComponent from "../../components/bon-livraison-list/bon-livraison-list";
import { findAllBonLivraisons } from "../../services/bon-livraison.service";
import "./bon-livraison-list-root.scss";

const BonLivraisonListRoot = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    findAllBonLivraisons()
      .then((res) => {
        setState((state) => ({
          ...state,
          bonLivraisons: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bon-livraison-root">
      <BonLivraisonListComponent bonLivraisons={state.bonLivraisons} />
    </div>
  );
};

export default BonLivraisonListRoot;

interface BonLivraisonListRootState {
  bonLivraisons: BonLivraison[];
}
const initialState: BonLivraisonListRootState = {
  bonLivraisons: [],
};
