import { useEffect, useState } from "react";
import { BonSortie } from "../../../stock/types/Stock.type";
import Title from "../../../title/title.component";
import DispatchList from "../../components/dispatch-list/dispatch-list.component";
import "./dispatch-list-root.component.scss";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";

// const BonSortieListRoot = () => {

interface DispatchListRootState {
  bonSorties: BonSortie[];
  error: string;
  message: string;
}

const DispatchListRoot = () => {
  const [state, setState] = useState<DispatchListRootState>({
    bonSorties: [],
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-sortie/dispatch")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            bonSorties: response.data,
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
  }, []);

  return (
    <div className="dispatch-list-root">
      <header>
        <Title text="Dispatch des articles" />
      </header>
      <section>
        <DispatchList bonSorties={state.bonSorties} />
      </section>
    </div>
  );
};

export default DispatchListRoot;
