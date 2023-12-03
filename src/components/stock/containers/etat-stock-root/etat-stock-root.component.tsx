import { useEffect, useState } from "react";
import EtatStockComponent from "../../components/etat-stock-component/etat-stock.component";
import "./etat-stock-root.component.scss";
import { EtatStockState } from "../../types/Stock.state";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import { EtatStockInput } from "../../types/Stock.type";
import Title from "../../../title/title.component";
import EtatStockForm from "../../components/etat-stock-form/etat-stock-form.component";

const EtatStockRoot = () => {
  document.title = "Etat de stock";
  const [state, setState] = useState<EtatStockState>({
    stocks: null,
    error: null,
  });

  const getEtatStock = (inputs: EtatStockInput) => {
    console.log("FECTHING ", inputs);

    httpClient
      .post(`/stock/etat`, inputs)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            stocks: response.data,
          }));
        } else {
          console.log(response.error);
          setState((state) => ({
            ...state,
            error: response.error,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        const response = err.response.data;
        setState((state) => ({
          ...state,
          error: response.error,
        }));
      });
  };

  return (
    <>
      <header>
        <Title text="Etat de stock" />
      </header>
      <EtatStockForm sendForm={getEtatStock} />
      <EtatStockComponent stock={state.stocks} />
    </>
  );
};

export default EtatStockRoot;
