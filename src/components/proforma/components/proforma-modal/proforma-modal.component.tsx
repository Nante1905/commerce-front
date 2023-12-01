import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import "./proforma-modal.component.scss";

interface ProformaModalState {
  fournisseurs: number[];
  livraison: string;
}

const ProformaModal = (props: any) => {
  const [state, setState] = useState<ProformaModalState>({
    fournisseurs: props.fournisseurs,
    livraison: "",
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCheckFournisseur = (event: ChangeEvent<HTMLInputElement>) => {
    const fournisseurs = [...state.fournisseurs];
    if (fournisseurs.includes(parseInt(event.target.value))) {
      const index = fournisseurs.indexOf(parseInt(event.target.value));
      fournisseurs.splice(index, 1);
      setState({ ...state, fournisseurs: fournisseurs });
    } else {
      fournisseurs.push(parseInt(event.target.value));
      setState({ ...state, fournisseurs: fournisseurs });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onModalSubmit(state.fournisseurs, state.livraison);
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelOutlinedIcon
            className="close-icon"
            onClick={props.closeModal}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Remplir les informations pour la demande de proforma
          </Typography>

          <div className="form-modal">
            <form onSubmit={handleSubmit}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="Date delai livraison"
                  onChange={(value: Dayjs | null) =>
                    setState((state: ProformaModalState) => ({
                      ...state,
                      livraison: value?.format("YYYY-MM-DD") as string,
                    }))
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <br />
              <FormControl
                className="fournisseur-checkbox"
                error={
                  state.fournisseurs.length < 3 &&
                  props.fournisseurs.length >= 3
                }
              >
                <FormGroup>
                  <h5>Fournisseurs</h5>
                  {props.fournisseurs?.map((fournisseur) => (
                    <FormControlLabel
                      key={fournisseur.id}
                      control={
                        <Checkbox
                          onChange={(event) => handleCheckFournisseur(event)}
                          value={fournisseur.id}
                        />
                      }
                      label={fournisseur.nom}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Au moins 3</FormHelperText>
              </FormControl>
              <Button variant="contained" type="submit">
                Valider
              </Button>
            </form>
          </div>
          {props.modal.sendLoading ? (
            <CircularProgress style={{ textAlign: "center" }} />
          ) : (
            <></>
          )}
        </Box>
      </Modal>
      <Snackbar open={props.modal.sendSuccess}>
        <Alert severity="success">{props.modal.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default ProformaModal;
