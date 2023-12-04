import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./bon-sortie-component.component.scss";
import generatePDF from "react-to-pdf";
import { BonSortie } from "../../types/Stock.type";
import { useRef } from "react";
import { CloudDownload } from "@mui/icons-material";

interface BonSortieProps {
  bonSortie: BonSortie;
}

const BonSortieComponent = (props: BonSortieProps) => {
  document.title = `Bon de sortie | ${props.bonSortie.reference}`;
  const targetRef = useRef<HTMLElement | null>(null);

  return (
    <div className="bon-sortie">
      <Button
        variant="contained"
        onClick={() =>
          generatePDF(targetRef, {
            filename: props.bonSortie.reference + ".pdf",
          })
        }
      >
        <CloudDownload
          style={{
            marginRight: ".5rem",
          }}
        />{" "}
        PDF
      </Button>
      <section ref={targetRef}>
        <div className="title">
          <h2 className="center">Bon de sortie de stock</h2>
        </div>
        <div className="fournisseur info">
          <p>
            <strong> Service bénéficiaire: </strong>{" "}
            {props.bonSortie.sortie.direction?.nom}
          </p>
          <p>
            <strong>Date: </strong> {props.bonSortie.sortie.jour}
          </p>
        </div>

        <div className="table">
          <Table>
            <TableHead>
              <TableRow className="table-head-row">
                <TableCell>Référence des articles</TableCell>
                <TableCell>Désignation des articles</TableCell>
                <TableCell>Quantité (Unité) </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bonSortie?.sortie.details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.article.reference}</TableCell>
                  <TableCell>{detail.article.designation}</TableCell>
                  <TableCell align="right">{detail.qte}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="actions">
          <p>Le Magasinier</p>
          <p>Le bénéficiaire</p>
        </div>
      </section>
    </div>
  );
};

export default BonSortieComponent;
