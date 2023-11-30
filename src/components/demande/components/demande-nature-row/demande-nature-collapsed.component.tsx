import { Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsDemandeParNature } from "../../../shared/types/demande.type";
import {
  DemandeNatureState,
  toggleDemande,
} from "../../store/slice/demandeNature.slice";
import { Article } from "../../../../types/item.type";
import { DemandeStore } from "../../store/demande.store";

const DemandeNatureCollapsed = (props: any) => {
  const article: Article = props.article;
  const details: DetailsDemandeParNature = props.details;
  const iArticle = props.iArticle;
  const iDetails = props.iDetails;
  const dispatch = useDispatch();

  const checked = useSelector(
    (state: DemandeStore) =>
      state.demandeNature.demandes[iArticle].details[iDetails].selected
  );

  const checkable = useSelector(
    (state: DemandeStore) => state.demandeNature.checkable
  );

  return (
    <TableRow>
      <TableCell>{details.jour}</TableCell>
      <TableCell>{details.direction.nom}</TableCell>
      <TableCell align="right">{details.quantite}</TableCell>
      <TableCell>
        {checkable && (
          <Checkbox
            onChange={() => {
              dispatch(
                toggleDemande({
                  article: article.id,
                  demande: details.idDemande,
                  iDemande: iArticle,
                  iDetails,
                })
              );
            }}
            checked={checked}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default DemandeNatureCollapsed;
