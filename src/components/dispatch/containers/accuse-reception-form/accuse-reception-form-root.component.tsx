import "./accuse-reception-form-root.component.scss";
import Title from "../../../title/title.component";
import AccuseReceptionForm from "../../components/accuse-reception-form/accuse-reception-form.component";
import { Article } from "../../../../types/item.type";
import { BonSortie } from "../../../stock/types/Stock.type";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface AccuseReceptionState {
  articles: Article[];
  bonSortie: BonSortie | null;
  error: string;
  message: string;
}

const AccuseReceptionFormRoot = () => {
  const params = useParams();
  const id = params.id;
  const [state, setState] = useState<AccuseReceptionState>({
    articles: [],
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
            error: response.error,
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

    httpClient
      .get("articles")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            articles: response.data,
          }));
        } else {
          setState((state) => ({
            ...state,
            error: response.error,
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
    <div className="accuse-reception-form-root">
      <header>
        <Title text="Saisie accusé de réception" />
      </header>
      <section>
        {state.bonSortie && (
          <AccuseReceptionForm
            articles={state.articles}
            bonSortie={state.bonSortie}
          />
        )}
      </section>
    </div>
  );
};

export default AccuseReceptionFormRoot;
