import { useEffect, useState } from "react";
import { Article } from "../../../../types/item.type";
import { BonCommande } from "../../../bon-de-commande/types/bon-commande.types";
import { findAllBonCommandeValides } from "../../../bon-livraison/services/bon-livraison.service";
import { findAllArticles } from "../../../shared/services/shared.service";
import FactureFormComponent from "../../components/facture-form/facture-form";

const FactureFormRoot = () => {
  const [state, setState] = useState<FactureFormRootState>(initialState);

  useEffect(() => {
    findAllArticles()
      .then((res) => {
        setState((state) => ({
          ...state,
          articles: res.data.data,
        }));
      })
      .catch((err) => console.log(err));

    findAllBonCommandeValides()
      .then((res) => {
        setState((state) => ({
          ...state,
          bonCommandes: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <FactureFormComponent
        articles={state.articles}
        bonCommandes={state.bonCommandes}
      />
    </div>
  );
};

export default FactureFormRoot;

interface FactureFormRootState {
  articles: Article[];
  bonCommandes: BonCommande[];
}

const initialState: FactureFormRootState = {
  articles: [],
  bonCommandes: [],
};
