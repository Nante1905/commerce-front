import { useEffect, useState } from "react";
import { BonEntre } from "../../types/Stock.type";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import Title from "../../../title/title.component";
import BonEntreList from "../../components/bon-entre-list/bon-entre-list.component";

interface BonEntreListRootState {
  bonEntres: BonEntre[];
  error: string;
  message: string;
}

const BonEntreListRoot = () => {
  const [state, setState] = useState<BonEntreListRootState>({
    bonEntres: [],
    error: "",
    message: "",
  });

  useEffect(() => {
    httpClient
      .get("/bon-entre")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            bonEntres: response.data,
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
        <BonEntreList bonEntres={state.bonEntres} />
      </section>
    </div>
  );
};

export default BonEntreListRoot;
