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
import { ToWords } from "to-words";
import Title from "../../../title/title.component";
import { BonCommande } from "../../types/bon-commande.types";
import "./details-bon-commande.scss";

const DetailsBonCommandeComponent = (props: DetailsBonCommandeProps) => {
  const bonCommande = props?.bonCommande;

  const toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
      ignoreZeroCurrency: false,
      currencyOptions: {
        name: "Ariray",
        plural: "Ariary",
        symbol: "MGA",
        fractionalUnit: {
          name: "Ariary",
          plural: "Ariary",
          symbol: "MGA",
        },
      },
    },
  });

  const targetRef = useRef<HTMLElement | null>(null);

  return (
    <div className="details-bon-commande">
      <header>
        <Title text="Details bon de commande" />
      </header>
      <Button
        variant="contained"
        onClick={() =>
          generatePDF(targetRef, { filename: bonCommande.reference + ".pdf" })
        }
      >
        <CloudDownload
          style={{
            marginRight: ".5rem",
          }}
        />{" "}
        PDF
      </Button>
      <section className="commande" ref={targetRef}>
        <div className="en-tete">
          <div className="title">
            <h1>Bon de commande</h1>
          </div>
          <div className="details">
            <img src="/spring-3.svg" alt="" />
            <p>
              <strong>Spring industries </strong>
              <br />
              Andoharanofotsy, Antananarivo
              <br />
              0321234567
            </p>
            <br />
            <br />
            <p>
              <strong>Date : </strong>
              {new Date(bonCommande?.dateCreation).toLocaleDateString("fr-FR")}
            </p>
            <p>
              <strong>Commande : </strong>
              {bonCommande?.reference}
            </p>
          </div>
          <div className="fournisseur">
            <h3>Fournisseur</h3>
            <p>
              <strong>Nom : </strong>
              {bonCommande?.fournisseur.nom}
            </p>
            <p>
              <strong>Email : </strong>
              {bonCommande?.fournisseur.email}
            </p>
            <p>
              <strong>Phone : </strong>
              {bonCommande?.fournisseur.telephone}
            </p>
          </div>
        </div>
        <div className="info-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paiement</TableCell>
                <TableCell>Livraison</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {bonCommande?.paiement.nom || "En attente de validation"}
                </TableCell>
                <TableCell> {bonCommande?.delaiLivraison} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="detail-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quantité</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>PU HT</TableCell>
                <TableCell>TVA</TableCell>
                <TableCell>PU TTC</TableCell>
                <TableCell>Total HT</TableCell>
                <TableCell>Total TTC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bonCommande?.details.map((details, index) => (
                <TableRow key={index}>
                  <TableCell> {details.quantite.toLocaleString()} </TableCell>
                  <TableCell>{details.article.designation}</TableCell>
                  <TableCell>{details.puHt.toLocaleString()}</TableCell>
                  <TableCell>{details.tva.toLocaleString()}</TableCell>
                  <TableCell>{details.puTTC.toLocaleString()}</TableCell>
                  <TableCell>
                    {(details.puHt * details.quantite).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {(details.puTTC * details.quantite).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="row-info" colSpan={3}>
                  TOTAUX
                </TableCell>
                <TableCell>
                  {bonCommande?.details
                    .reduce((i, detail) => i + detail.tva * detail.quantite, 0)
                    .toLocaleString()}
                </TableCell>
                <TableCell className="none-cell"></TableCell>
                <TableCell>
                  {bonCommande?.details
                    .reduce((i, detail) => i + detail.puHt * detail.quantite, 0)
                    .toLocaleString()}
                </TableCell>
                <TableCell>
                  {bonCommande?.details
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
        <h4>
          Arrete a la somme de :{" "}
          {toWords.convert(
            bonCommande?.details.reduce(
              (i, detail) => i + detail.puTTC * detail.quantite,
              0
            ) || 0
          )}
        </h4>
      </section>
    </div>
  );
};

export default DetailsBonCommandeComponent;

interface DetailsBonCommandeProps {
  bonCommande: BonCommande;
}
