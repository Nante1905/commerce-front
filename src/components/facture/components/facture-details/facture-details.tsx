import {
  Check,
  CloudDownload,
  KeyboardArrowDown,
  KeyboardArrowUp,
  WarningAmber,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import { Facture } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import { validerFacture } from "../../services/facture.service";
import "./facture-details.scss";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";

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

  const sendExplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("SEND EXPLICATION ", state.explication);
    httpClient
      .post(`/factures/${props.facture.id}/explications`, state.explication)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setState((state) => ({
            ...state,
            message: response.message,
          }));
        } else {
          setState((state) => ({
            ...state,
            error: response.err,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        setState((state) => ({
          ...state,
          error: err.response?.data?.err,
        }));
      });
  };

  return (
    <>
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
        <div className="explications-list">
          <div className="explication-actions">
            <p className="subtitle">Explications</p>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() =>
                setState((state) => ({
                  ...state,
                  openExplication: !state.openExplication,
                }))
              }
            >
              {state.openExplication ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )}
            </IconButton>
          </div>
          <Collapse in={state.openExplication} timeout="auto" unmountOnExit>
            {props.facture?.explications?.map((explication, index) => (
              <div className="explication-card" key={`k_${index}`}>
                <p>{explication.explication}</p>
                <small>
                  {" "}
                  <strong>
                    {explication.employe.nom} {explication.employe.prenom}
                  </strong>
                  , {new Date(explication.jour).toLocaleString()}{" "}
                </small>
              </div>
            ))}
            <form className="form" onSubmit={(event) => sendExplication(event)}>
              <FormControl sx={{ width: "30%" }}>
                <TextField
                  label="Votre explication"
                  multiline
                  required
                  onChange={(event) => {
                    setState((state) => ({
                      ...state,
                      explication: { text: event.target.value },
                    }));
                  }}
                />
              </FormControl>
              <Button type="submit" variant="contained">
                Envoyer
              </Button>
            </form>
          </Collapse>
        </div>
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
                      .reduce(
                        (i, detail) => i + detail.puHt * detail.quantite,
                        0
                      )
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
                      .reduce(
                        (i, detail) => i + detail.tva * detail.quantite,
                        0
                      )
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
      <Snackbar
        open={state.error !== ""}
        onClose={() => setState((state) => ({ ...state, error: "" }))}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setState((state) => ({ ...state, error: "" }))}
        >
          {state.error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.message !== ""}
        onClose={() => setState((state) => ({ ...state, message: "" }))}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setState((state) => ({ ...state, message: "" }))}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </>
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
  openExplication: boolean;
  explication: {
    text: string;
  };
  error: string;
  message: string;
}

const initialState: FactureDetailsState = {
  validerSuccess: false,
  validerFail: false,
  validerLoading: false,
  validerMessage: "",
  openExplication: false,
  explication: {
    text: "",
  },
  error: "",
  message: "",
};
