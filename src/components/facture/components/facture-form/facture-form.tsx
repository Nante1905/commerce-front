import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import { Article } from "../../../../types/item.type";
import { BonCommande } from "../../../bon-de-commande/types/bon-commande.types";
import { bonCommandeDetailsToArticleQteDetails } from "../../../bon-livraison/utils/bon-livraison.utils";
import DetailsArticleQte, {
  DetailsArticleQteType,
} from "../../../shared/components/details-article-qte/details-article-qte";
import Title from "../../../title/title.component";
import { insertFacture } from "../../services/facture.service";
import "./facture-form.scss";

const FactureFormComponent = (props: FactureFormComponentProps) => {
  const [state, setState] = useState<FactureFormComponentState>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    insertFacture(state.form)
      .then((res) => {
        setState((state) => ({
          ...state,
          insertError: false,
          insertSuccess: true,
          insertMessage: res.data.message,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          insertError: true,
          insertSuccess: false,
          insertMessage: err.response.data.message,
        }));
      });
  };

  const handleChangeBonCommande = (event: SelectChangeEvent<unknown>) => {
    const idBonCommande = event.target.value as number;
    const bonCommande = props.bonCommandes.filter(
      (b) => b.id == idBonCommande
    )[0].details;
    const bonCommandeDetails =
      bonCommandeDetailsToArticleQteDetails(bonCommande);
    setState((state) => ({
      ...state,
      form: {
        ...state.form,
        bonDeCommande: {
          id: idBonCommande,
        },
        details: bonCommandeDetails.map((detail, index) => ({
          ...detail,
          pu:
            state.form.formatPrix == 0
              ? bonCommande[index].puHt
              : bonCommande[index].puTTC,
        })),
      },
    }));
  };

  return (
    <div className="facture-form">
      <div className="header">
        <Title text="Saisie facture" />
      </div>
      <div className="content">
        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-item">
              <FormControl className="input" sx={{ width: 200 }}>
                <InputLabel id="select-label">Format Prix</InputLabel>

                <Select
                  labelId="select-label"
                  id="select"
                  label="Format prix"
                  onChange={(event) => {
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        formatPrix: event.target.value as number,
                      },
                    }));
                  }}
                  required
                >
                  <MenuItem value={0}>HT</MenuItem>
                  <MenuItem value={1}>TTC</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-item">
              <TextField
                label="Reference"
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      reference: event.target.value as string,
                    },
                  }));
                }}
              />
            </div>
            <div className="form-item">
              <FormControl className="input" sx={{ width: 200 }}>
                <InputLabel id="select-label">Bon de commande</InputLabel>

                <Select
                  labelId="select-label"
                  id="select"
                  label="Bon de commande"
                  onChange={(event) => {
                    handleChangeBonCommande(event);
                  }}
                  required
                >
                  {props.bonCommandes?.map((bon, index) => (
                    <MenuItem key={index} value={bon.id}>
                      {bon.reference}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="form-item">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="Date"
                  onChange={(value: Dayjs | null) =>
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        jour: value?.format("YYYY-MM-DD") as string,
                      },
                    }))
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </div>
            <div className="form-item">
              <DetailsArticleQte
                withPu={true}
                articles={props.articles}
                onDataChange={(data) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      details: data,
                    },
                  }));
                }}
                details={state.form.details}
              />
            </div>
            <div className="form-item submit">
              <Button variant="contained" type="submit">
                Valider
              </Button>
            </div>
          </form>
        </div>
        <Snackbar
          open={state.insertSuccess || state.insertError}
          autoHideDuration={6000}
        >
          <Alert severity={state.insertSuccess ? "success" : "error"}>
            {state.insertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default FactureFormComponent;

interface FactureFormComponentProps {
  articles: Article[];
  bonCommandes: BonCommande[];
}

interface FactureFormComponentState {
  form: {
    formatPrix: number;
    reference: string;
    bonDeCommande: {
      id: number;
    };
    jour: string;
    details: DetailsArticleQteType[];
  };

  insertSuccess: boolean;
  insertError: boolean;
  insertMessage: string;
}
const initialState: FactureFormComponentState = {
  form: {
    formatPrix: 0,
    reference: "",
    bonDeCommande: {
      id: 0,
    },
    jour: "",
    details: [],
  },
  insertError: false,
  insertSuccess: false,
  insertMessage: "",
};
