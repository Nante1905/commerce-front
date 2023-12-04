import { useParams } from "react-router-dom";
import Title from "../../../title/title.component";
import { useEffect, useState } from "react";
import { BonEntre, BonSortie } from "../../types/Stock.type";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import BonEntreComponent from "../../components/bon-entre/bon-entre-component.component";

interface BonEntreState {
  bonEntre: BonEntre | null;
  error: string;
  message: string;
}

const BonEntreRoot = () => {
  const param = useParams();
  const id = param.id as string;
  const [state, setState] = useState<BonEntreState>({
    bonEntre: null,
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-entre/" + id)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            bonEntre: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            error: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        setState((state) => ({
          ...state,
          error: err.response?.data?.err,
        }));
      });
  }, [id]);

  return (
    <div className="bon-sortie-root">
      <header>
        <Title text="Bon d'entrée" />
      </header>
      {state.bonEntre && (
        <section>
          <BonEntreComponent bonEntre={state.bonEntre} />
        </section>
      )}
    </div>
  );
};

export default BonEntreRoot;
