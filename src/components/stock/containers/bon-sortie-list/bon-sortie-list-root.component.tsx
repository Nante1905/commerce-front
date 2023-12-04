import { useEffect, useState } from "react";
import { BonSortie } from "../../types/Stock.type";
import "./bon-sortie-list-root.component.scss";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import Title from "../../../title/title.component";
import BonSortieList from "../../components/bon-sortie-list/bon-sortie-list.component";

interface BonSortieListRootState {
  bonSorties: BonSortie[];
  error: string;
  message: string;
}

const BonSortieListRoot = () => {
  const [state, setState] = useState<BonSortieListRootState>({
    bonSorties: [],
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-sortie")
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
    <div className="bon-sortie-root">
      <header>
        <Title text="Liste bon de sortie" />
      </header>
      <section>
        <BonSortieList bonSorties={state.bonSorties} />
      </section>
    </div>
  );
};

export default BonSortieListRoot;
