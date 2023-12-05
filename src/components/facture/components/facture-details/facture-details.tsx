import { Check, CloudDownload, WarningAmber } from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import { Facture } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import { validerFacture } from "../../services/facture.service";
import "./facture-details.scss";

const FactureDetailsComponent = (props: FactureDetailsProps) => {
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<FactureDetailsState>(initialState);

  const getPDF = () => {
    generatePDF(pdfRef, {
      filename: props.facture.reference + ".pdf",
    });
  };

  const handleValider = (id: string) => {
    setState((state) => ({
      ...state,
      validerLoading: true,
    }));
    validerFacture(id)
      .then((res) => {
        setState((state) => ({
          ...state,
          validerLoading: false,
          validerSuccess: true,
          validerMessage: res.data.message,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          validerLoading: false,
          validerFail: true,
          validerMessage: err.response.data.message,
        }));
      });
  };

  const renderValiderButton = () => {
    if (state.validerLoading) {
      return (
        <CircularProgress
          style={{
            width: "20px",
            height: "20px",
            color: "white",
          }}
        />
      );
    } else if (state.validerSuccess) {
      return (
        <Check
          style={{
            width: "20px",
            height: "20px",
            color: "white",
          }}
        />
      );
    } else {
      return "Valider";
    }
  };

  return (
    <div className="facture-details">
      <header>
        <Title text="Details facture" />
      </header>
      <Button
        variant="contained"
        onClick={() => getPDF()}
        style={{
          marginInline: "2rem",
        }}
      >
        <CloudDownload
          style={{
            marginRight: ".5rem",
          }}
        />{" "}
        PDF
      </Button>
      {props.facture?.etat === 0 ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleValider(props.facture.id.toString())}
        >
          {renderValiderButton()}
        </Button>
      ) : (
        <Chip label="Validé" color="success" />
      )}
      <br />
      {props.facture?.probleme?.map((probleme, index) => (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBlock: ".5rem",
          }}
          key={index}
        >
          <WarningAmber
            style={{
              color: "red",
            }}
          />{" "}
          {probleme}
        </p>
      ))}
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

interface FactureDetailsState {
  validerSuccess: boolean;
  validerFail: boolean;
  validerLoading: boolean;
  validerMessage: string;
}

const initialState: FactureDetailsState = {
  validerSuccess: false,
  validerFail: false,
  validerLoading: false,
  validerMessage: "",
};
