import { useEffect, useState } from "react";
import Title from "../../../title/title.component";
import SortieStockForm, {
  SortieStockFormProps,
} from "../../components/sortie-stock-form/sortie-stock-form.component";
import "./sortie-stock-root.component.scss";
import { SortieStockState } from "../../types/Stock.state";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import { SortieStock } from "../../types/Stock.type";

const SortieStockRoot = () => {
  document.title = "Saisie sortie de stock";
  const initialState: SortieStockState = {
    types: [],
    directions: [],
    articles: [],
    error: "",
    message: "",
  };
  const [state, setState] = useState<SortieStockState>(initialState);

  useEffect(() => {
    httpClient
      .get("/type-sortie")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            types: response.data,
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
      });

    httpClient
      .get("/directions")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            directions: response.data,
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
      });

    httpClient
      .get("/articles")
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
      });
  }, []);

  return (
    <div className="sortie-stock-root">
      <Title text="Sortie de stock" />
      <SortieStockForm
        types={state.types}
        directions={state.directions}
        articles={state.articles}
      />
    </div>
  );
};

export default SortieStockRoot;
