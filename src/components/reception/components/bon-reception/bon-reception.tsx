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
import { BonReception } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import { findAllBonReceptionById } from "../../services/reception.services";
import "./bon-reception.scss";

const BonReceptionComponent = () => {
  const params = useParams();
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<BonReceptionState>(initialState);

  useEffect(() => {
    findAllBonReceptionById(params.id)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          bonReception: response.data.data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getPDF = (): void => {
    generatePDF(pdfRef, {
      filename: state.bonReception?.reference + ".pdf",
    });
  };

  return (
    <div className="bon-reception">
      <div className="header">
        <Title text="Bon de reception" />
      </div>
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
      <div className="content" ref={pdfRef}>
        <h1>Bon de réception</h1>
        <div className="info">
          <img src="/spring-3.svg" alt="" />
          <p>
            <strong>Spring industries</strong>
          </p>
          <p>Andoharanofotsy, Antananarivo</p>
        </div>
        <div className="info fournisseur">
          <h3>Fournisseur</h3>
          <p>
            <strong>
              {
                state.bonReception?.bonDeLivraison?.bonDeCommande.fournisseur
                  .nom
              }
            </strong>
          </p>
          <p>
            {
              state.bonReception?.bonDeLivraison?.bonDeCommande.fournisseur
                .email
            }
          </p>
        </div>
        <div className="info bon">
          <p>
            <strong>Reference : </strong> {state.bonReception?.reference}
          </p>
          <p>
            <strong>Date : </strong> {state.bonReception?.jour}
          </p>
          <p>
            <strong>Operateur : </strong>{" "}
            {state.bonReception?.employe?.nom +
              " " +
              state.bonReception?.employe?.prenom +
              " - " +
              state.bonReception?.employe?.direction.nom}
          </p>
        </div>
        <div className="details">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell>Qte reçu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.bonReception?.details?.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.article.designation}</TableCell>
                  <TableCell>{detail.qte}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BonReceptionComponent;

interface BonReceptionState {
  bonReception: BonReception | undefined;
}
const initialState: BonReceptionState = {
  bonReception: undefined,
};
