import { DetailsArticleQteType } from "../../shared/components/details-article-qte/details-article-qte";
import { DetailsResultatProforma } from "../types/proforma.types";

export const articleQteToResutltatProforma = (
  details: DetailsArticleQteType[]
): DetailsResultatProforma[] => {
  let res: DetailsResultatProforma[] = [];
  details.forEach((detail) => {
    res.push({
      article: {
        id: detail.article.id,
      },
      pu: detail.pu,
      quantiteDispo: detail.qte,
    });
  });
  return res;
};
