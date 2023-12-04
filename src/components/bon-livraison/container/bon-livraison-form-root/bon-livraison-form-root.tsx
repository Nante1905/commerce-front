import { useEffect, useState } from "react";
import { Article } from "../../../../types/item.type";
import { BonCommande } from "../../../bon-de-commande/types/bon-commande.types";
import { findAllArticles } from "../../../shared/services/shared.service";
import BonLivraisonFormComponent from "../../components/bon-livraison-form/bon-livraison-form";
import { findAllBonCommandeValides } from "../../services/bon-livraison.service";

const BonLivraisonFromRoot = () => {
  const [state, setState] = useState(initialState);

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
      <BonLivraisonFormComponent
        articles={state.articles}
        bonCommandes={state.bonCommandes}
      />
    </div>
  );
};

export default BonLivraisonFromRoot;

interface BonLivraisonFromRootState {
  articles: Article[];
  bonCommandes: BonCommande[];
}

const initialState: BonLivraisonFromRootState = {
  articles: [],
  bonCommandes: [],
};
