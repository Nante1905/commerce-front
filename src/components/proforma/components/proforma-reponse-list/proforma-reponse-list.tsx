import {
  Alert,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import Title from "../../../title/title.component";
import {
  findProformaWithReponse,
  genererBonDeCommande,
} from "../../services/proforma.service";
import { ProformaResultat } from "../../types/proforma.types";
import "./proforma-reponse-list.scss";

const ProformaReponseListComponent = () => {
  const [state, setState] = useState<ProformaReponseListState>(initialState);

  useEffect(() => {
    findProformaWithReponse()
      .then((res) => {
        console.log(res);
        setState((state) => ({
          ...state,
          profromas: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleGenererBonDeCommande = (id: number) => {
    genererBonDeCommande(id)
      .then((res) => {
        console.log(res);
        setState((state) => ({
          ...state,
          generateSucces: true,
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="proforma-reponse-list">
      <header>
        <Title text="Liste des demandes proforma" />
        <h5>Resultat saisie</h5>
      </header>
      <section className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Date demande</TableCell>
              <TableCell>Nombre Demande</TableCell>
              <TableCell>Nombre Reponse</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.profromas?.map((proforma, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{proforma.proforma.reference}</TableCell>
                <TableCell>{proforma.proforma.jourDemande}</TableCell>
                <TableCell>{proforma.demande}</TableCell>
                <TableCell>{proforma.reponse}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleGenererBonDeCommande(proforma.proforma.id)
                    }
                  >
                    Generer bon de commande
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Snackbar open={state.generateSucces}>
        <Alert severity="success">Bon de commande generer avec succes</Alert>
      </Snackbar>
    </div>
  );
};

export default ProformaReponseListComponent;

interface ProformaReponseListState {
  profromas: ProformaResultat[];
  generateSucces: boolean;
  generateError: boolean;
}
const initialState: ProformaReponseListState = {
  profromas: [],
  generateError: false,
  generateSucces: false,
};
