import { useParams } from "react-router-dom";
import Title from "../../../title/title.component";
import "./bon-sortie-root.component.scss";
import { useEffect, useState } from "react";
import { BonSortie } from "../../types/Stock.type";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import BonSortieComponent from "../../components/bon-sortie/bon-sortie-component.component";

interface BonSortieState {
  bonSortie: BonSortie | null;
  error: string;
  message: string;
}

const BonSortieRoot = () => {
  const param = useParams();
  const id = param.id as string;
  const [state, setState] = useState<BonSortieState>({
    bonSortie: null,
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-sortie/" + id)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            bonSortie: response.data,
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
        <Title text="Bon de sortie" />
      </header>
      {state.bonSortie && (
        <section>
          <BonSortieComponent bonSortie={state.bonSortie} />
        </section>
      )}
    </div>
  );
};

export default BonSortieRoot;
