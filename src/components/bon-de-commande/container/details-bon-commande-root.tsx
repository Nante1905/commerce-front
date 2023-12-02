import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBonCommandeComponent from "../components/details-bon-commande/details-bon-commande";
import { findBonCommandeById } from "../service/bon.service";
import { BonCommande } from "../types/bon-commande.types";

const DetailsBonCommandeRoot = () => {
  const [state, setState] = useState<DetailsBonCommandeRootState>(initialState);
  const params = useParams();

  useEffect(() => {
    findBonCommandeById(params.id as string)
      .then((res) => {
        setState((state) => ({
          ...state,
          bonCommande: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <DetailsBonCommandeComponent
        bonCommande={state.bonCommande as BonCommande}
      />
    </div>
  );
};

export default DetailsBonCommandeRoot;

interface DetailsBonCommandeRootState {
  bonCommande: BonCommande | undefined;
}
const initialState: DetailsBonCommandeRootState = {
  bonCommande: undefined,
};
