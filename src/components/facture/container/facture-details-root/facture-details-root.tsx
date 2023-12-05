import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Facture } from "../../../shared/types/model.types";
import FactureDetailsComponent from "../../components/facture-details/facture-details";
import { findAllFactureById } from "../../services/facture.service";

const FactureDetailsRoot = () => {
  const [state, setState] = useState<FactureDetailsRootState>();

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    findAllFactureById(id as string)
      .then((res) => {
        setState((state) => ({
          ...state,
          facture: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <FactureDetailsComponent facture={state?.facture as Facture} />
    </div>
  );
};

export default FactureDetailsRoot;

interface FactureDetailsRootState {
  facture: Facture;
}
