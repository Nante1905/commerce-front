import { BonCommandeDetails } from "../../bon-de-commande/types/bon-commande.types";
import { DetailsArticleQteType } from "../../shared/components/details-article-qte/details-article-qte";

export const bonCommandeDetailsToArticleQteDetails = (
  bonCommande: BonCommandeDetails[]
): DetailsArticleQteType[] => {
  let res: DetailsArticleQteType[] = [];

  bonCommande.forEach((bon) => {
    res.push({
      article: {
        id: bon.article.id,
      },
      qte: bon.quantite,
    });
  });
  return res;
};
