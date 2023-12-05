import { DetailsArticleQteType } from "../../shared/components/details-article-qte/details-article-qte";
import { DetailsSortieStock } from "../types/Stock.type";


export const castToDetailsStock = (
    data: DetailsArticleQteType[]
): DetailsSortieStock[] => {
    let details: DetailsSortieStock[] = [];
    data.forEach((d) => {
        details.push({
            article: { id: d.article.id },
            qte: d.qte,
        });
    });
    return details;
};

export const DetailsStockToDetailsArticleQteType = (
    data: DetailsArticleQteType[]
): DetailsArticleQteType[] => {
    let details: DetailsArticleQteType[] = [];
    data.map((d) => {
        details.push({
            article: { id: d.article.id },
            qte: d.qte,
        });
    });
    return details;
};