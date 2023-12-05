import { useEffect, useState } from "react";
import { Article } from "../../../../types/item.type";
import { findAllBonLivraisons } from "../../../bon-livraison/services/bon-livraison.service";
import { findAllArticles } from "../../../shared/services/shared.service";
import { BonLivraison } from "../../../shared/types/model.types";
import BonReceptionFormComponent from "../../components/bon-reception-form/bon-reception-form";

const BonReceptionFormRoot = () => {
  const [state, setState] = useState<BonReceptionFormRootState>(initialState);

  useEffect(() => {
    findAllBonLivraisons()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          bonLivraisons: res.data.data,
        }));
      })
      .catch((error) => console.log(error));
    findAllArticles()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          articles: res.data.data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <BonReceptionFormComponent
        bonLivraisons={state?.bonLivraisons}
        articles={state.articles}
      />
    </div>
  );
};

export default BonReceptionFormRoot;

interface BonReceptionFormRootState {
  bonLivraisons: BonLivraison[];
  articles: Article[];
}

const initialState: BonReceptionFormRootState = {
  bonLivraisons: [],
  articles: [],
};
