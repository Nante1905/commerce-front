import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import generatePDF from "react-to-pdf";
import { BonEntre, BonSortie } from "../../types/Stock.type";
import { useRef } from "react";
import { CloudDownload } from "@mui/icons-material";

interface BonEntreProps {
  bonEntre: BonEntre;
}

const BonEntreComponent = (props: BonEntreProps) => {
  document.title = `Bon d'entrée  | ${props.bonEntre.reference}`;
  const targetRef = useRef<HTMLElement | null>(null);
  console.log(props.bonEntre);

  return (
    <div className="bon-sortie">
      <Button
        variant="contained"
        onClick={() =>
          generatePDF(targetRef, {
            filename: props.bonEntre.reference + ".pdf",
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
          <h2 className="center">Bon d'entrée de stock</h2>
        </div>
        <div className="fournisseur info">
          <p>
            <strong>Date: </strong> {props.bonEntre.jour}
          </p>
          <p>
            <strong> Saisi par: </strong>{" "}
            {`${props.bonEntre.entreStock.employe?.nom} ${props.bonEntre.entreStock.employe?.prenom}`}
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
              {props.bonEntre?.entreStock.details.map((detail, index) => (
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
        </div>
      </section>
    </div>
  );
};

export default BonEntreComponent;
