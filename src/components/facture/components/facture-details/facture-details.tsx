import { CloudDownload } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import { Facture } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import "./facture-details.scss";

const FactureDetailsComponent = (props: FactureDetailsProps) => {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const getPDF = () => {
    generatePDF(pdfRef, {
      filename: props.facture.reference + ".pdf",
    });
  };

  return (
    <div className="facture-details">
      <header>
        <Title text="Details facture" />
      </header>
      <Button variant="contained" onClick={() => getPDF()}>
        <CloudDownload
          style={{
            marginRight: ".5rem",
          }}
        />{" "}
        PDF
      </Button>
      <div className="content" ref={pdfRef}>
        <h2>Facture</h2>
        <div className="info fournisseur">
          <h3>Vendeur</h3>
          <p>{props.facture?.bonDeCommande.fournisseur.nom}</p>
          <p>{props.facture?.bonDeCommande.fournisseur.email}</p>
        </div>
        <div className="info client">
          <h3>Client</h3>
          <p>Spring industries</p>
          <p>Andoharanofotsy, Antananarivo</p>
        </div>
        <div className="info facture-info">
          <p>
            <strong>Facture n°:</strong>
            {props.facture?.reference}
          </p>
          <p>
            <strong>Date de facturation :</strong> {props.facture?.jour}
          </p>
        </div>
        <div className="detail">
          <h3>Details</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quantité</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>PU HT</TableCell>
                <TableCell>TVA</TableCell>
                <TableCell>Total TTC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.facture?.bonDeCommande.details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.quantite}</TableCell>
                  <TableCell>{detail.article.designation}</TableCell>
                  <TableCell>{detail.puHt.toLocaleString()}</TableCell>
                  <TableCell>{detail.tva.toLocaleString()}</TableCell>
                  <TableCell>
                    {(detail.puTTC * detail.quantite).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total HT</TableCell>
                <TableCell>
                  {props.facture?.bonDeCommande?.details
                    .reduce((i, detail) => i + detail.puHt * detail.quantite, 0)
                    .toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total TVA</TableCell>
                <TableCell>
                  {props.facture?.bonDeCommande?.details
                    .reduce((i, detail) => i + detail.tva * detail.quantite, 0)
                    .toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total TTC</TableCell>
                <TableCell>
                  {props.facture?.bonDeCommande?.details
                    .reduce(
                      (i, detail) => i + detail.puTTC * detail.quantite,
                      0
                    )
                    .toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FactureDetailsComponent;

interface FactureDetailsProps {
  facture: Facture;
}
