import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../../../../types/item.type";
import { findAllArticles } from "../../../shared/services/shared.service";
import Title from "../../../title/title.component";
import SaisieReponseProformaComponent from "../../components/saisie-reponse-proforma/saisie-reponse-proforma";
import "./saisie-reponse-proforma-root.scss";

const SaisieReponseProformaRoot = () => {
  const [state, setState] =
    useState<SaisieReponseProformaRootState>(initialState);

  const param = useParams();

  useEffect(() => {
    findAllArticles()
      .then((res) => {
        setState((state) => ({
          ...state,
          articles: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="saisie-proforma-root">
      <header>
        <Title text="Saisie de reponse proforma" />
      </header>
      <section>
        <SaisieReponseProformaComponent
          articles={state.articles}
          id={param.id as string}
        />
      </section>
    </div>
  );
};

export default SaisieReponseProformaRoot;

interface SaisieReponseProformaRootState {
  articles: Article[];
}
const initialState: SaisieReponseProformaRootState = {
  articles: [],
};
