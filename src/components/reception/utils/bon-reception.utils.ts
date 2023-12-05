import { DetailsArticleQteType } from "../../shared/components/details-article-qte/details-article-qte";
import { BonLivraison } from "../../shared/types/model.types";

export const bonLivraisonDetailsToArticleQte = (
  bonLivraison: BonLivraison
): DetailsArticleQteType[] => {
  return bonLivraison.details.map((detail) => ({
    article: detail.article,
    qte: detail.qte,
  }));
};
