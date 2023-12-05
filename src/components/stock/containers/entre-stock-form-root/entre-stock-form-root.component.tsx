import { useEffect, useState } from "react";
import { BonReception } from "../../types/Stock.type";
import "./entre-stock-form-root.component.scss";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import Title from "../../../title/title.component";
import EntreStockForm from "../../components/entre-stock-form/entre-stock-form.component";
import { Article } from "../../../../types/item.type";

interface EntreStockFormState {
  articles: Article[];
  bonReceptions: BonReception[];
  error: string;
  message: string;
}

const EntreStockFormRoot = () => {
  document.title = "Saisie entrée de stock";
  const [state, setState] = useState<EntreStockFormState>({
    articles: [],
    bonReceptions: [],
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-reception/valides")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          console.log("fecth recetption ", response.data);

          setState((state) => ({
            ...state,
            bonReceptions: response.data,
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
  }, []);

  return (
    <div className="sortie-stock-root">
      <header>
        <Title text="Saisie entrée de stock" />
      </header>
      <section>
        <EntreStockForm
          bonReceptions={state.bonReceptions}
          articles={state.articles}
        />
      </section>
    </div>
  );
};

export default EntreStockFormRoot;
