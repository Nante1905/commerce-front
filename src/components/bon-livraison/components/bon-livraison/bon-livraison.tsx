import { CloudDownload } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
import { BonLivraison } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import { findBonLivraison } from "../../services/bon-livraison.service";
import "./bon-livraison.scss";

const BonLivraisonComponent = () => {
  const param = useParams();
  const id = param.id as string;

  const targetRef = useRef<HTMLElement | null>(null);

  const [state, setState] = useState<{
    bonLivraison: BonLivraison | undefined;
  }>({
    bonLivraison: undefined,
  });

  useEffect(() => {
    findBonLivraison(id)
      .then((res) => setState({ ...state, bonLivraison: res.data.data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bon-livraison">
      <header>
        <Title text="Bon de livraison" />
      </header>
      <Button
        variant="contained"
        onClick={() =>
          generatePDF(targetRef, {
            filename: (state.bonLivraison as BonLivraison).reference + ".pdf",
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
          <h2>Bon de livraison</h2>
        </div>
        <div className="fournisseur info">
          <p>
            <strong>{state.bonLivraison?.bonDeCommande.fournisseur.nom}</strong>
          </p>
          <p>{state.bonLivraison?.bonDeCommande.fournisseur.email}</p>
        </div>
        <div className="destinataire info">
          <p>
            <h4>Destinataire</h4>
          </p>
          <img src="/spring-3.svg" alt="" />
          <h5>Spring industries</h5>
          <p>Andoharanofotsy, Madagascar</p>
        </div>
        <div className="livraison info">
          <p>
            <strong>Bon de livraison n°: </strong>
            {state.bonLivraison?.reference}
          </p>
          <p>
            <strong>Date emission: </strong> {state.bonLivraison?.jourSortie}
          </p>
          <p>
            <strong>Commande n°: </strong>{" "}
            {state.bonLivraison?.bonDeCommande.reference}
          </p>
        </div>

        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference produit</TableCell>
                <TableCell>Descritpion</TableCell>
                <TableCell>Quantite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.bonLivraison?.details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.article.reference}</TableCell>
                  <TableCell>{detail.article.designation}</TableCell>
                  <TableCell>{detail.qte}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default BonLivraisonComponent;
