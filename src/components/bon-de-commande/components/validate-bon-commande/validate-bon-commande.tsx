import {
  Alert,
  AlertColor,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../../../title/title.component";
import {
  findAllPaiement,
  findBonCommandeById,
  validerBonDeCommande,
} from "../../service/bon.service";
import { BonCommande, ModePaiement } from "../../types/bon-commande.types";
import "./validate-bon-commande.scss";

const ValidateBonCommandeComponent = () => {
  const [state, setState] = useState<ValidateBonCommandeState>(initialState);
  const params = useParams();
  const id = params.id?.toString();

  useEffect(() => {
    findAllPaiement()
      .then((res) => {
        setState((state) => ({
          ...state,
          modePaiements: res.data.data,
        }));
      })
      .catch((err) => console.log(err));

    findBonCommandeById(id as string)
      .then((res) =>
        setState((state) => ({
          ...state,
          bonCommande: res.data.data,
        }))
      )
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target[0].value);
    validerBonDeCommande(id as string, event.target[0].value)
      .then((res) => {
        setState((state) => ({
          ...state,
          message: res.data.message,
          validationStatus: "success",
        }));
      })
      .catch((err) =>
        setState((state) => ({
          ...state,
          message: err.response.data,
          validationStatus: "error",
        }))
      );
  };

  return (
    <div className="validation-bon-commande">
      <header>
        <Title text="Validation bon de commande" />
      </header>
      <section>
        <div className="info">
          <p>
            <strong>Reference : </strong>
            {state.bonCommande?.reference}
          </p>
        </div>
        <br />
        <br />
        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <FormControl className="input" sx={{ width: 200 }}>
              <InputLabel id="select-label">Mode de paiement</InputLabel>

              <Select
                labelId="select-label"
                id="select"
                label="Mode de paiement"
                required
              >
                {state.modePaiements?.map((paiement, index) => (
                  <MenuItem value={paiement.id} key={index}>
                    {paiement.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="contained" type="submit">
              Valider
            </Button>
          </form>
        </div>
      </section>
      <Snackbar open={state.message ? true : false}>
        <Alert severity={state.validationStatus}>{state.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default ValidateBonCommandeComponent;

interface ValidateBonCommandeState {
  modePaiements: ModePaiement[];
  bonCommande?: BonCommande;
  message?: string;
  validationStatus?: AlertColor;
}
const initialState: ValidateBonCommandeState = {
  modePaiements: [],
};
