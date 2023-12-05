import "./accuse-reception-form.component.scss";
import {
  Alert,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Article } from "../../../../types/item.type";
import { BonSortie, DetailsSortieStock } from "../../../stock/types/Stock.type";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import DetailsArticleQte from "../../../shared/components/details-article-qte/details-article-qte";
import {
  DetailsStockToDetailsArticleQteType,
  castToDetailsStock,
} from "../../../stock/services/stock.service";
import { FormEvent, useState } from "react";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";

interface AccuseReceptionFormProps {
  articles: Article[];
  bonSortie: BonSortie;
}

interface AccuseReceptionFormState {
  form: {
    bonSortie: {
      id: number;
    };
    details: DetailsSortieStock[];
  };
  error: string;
  message: string;
}

const AccuseReceptionForm = (props: AccuseReceptionFormProps) => {
  document.title = `Accusé de réception | ${props.bonSortie.reference}`;
  const [state, setState] = useState<AccuseReceptionFormState>({
    form: {
      bonSortie: { id: props.bonSortie.id },
      details: props.bonSortie.sortie.details,
    },
    error: "",
    message: "",
  });

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    console.log("SENDING DATA ", state.form);

    event.preventDefault();
    if (state.form.details.length == 0) {
      setState((state) => ({ ...state, error: "Ajoutez des articles" }));
    } else {
      httpClient
        .post("/accuse-reception", state.form)
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
    }
  };

  return (
    <>
      <Card className="card">
        <form
          className="sortie-stock-form"
          onSubmit={(event) => submitForm(event)}
        >
          <div className="sortie-info">
            <TextField
              value={props.bonSortie.reference}
              aria-readonly
              label="Bon de sortie"
            />
          </div>
          <h4 className="center subtitle ">Détails</h4>
          <DetailsArticleQte
            withPu={false}
            articles={props.articles}
            onDataChange={(data) => {
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  details: castToDetailsStock(data),
                },
              }));
              console.log("DATA CHANGE ", state.form);
            }}
            details={DetailsStockToDetailsArticleQteType(state.form.details)}
          />
          <div className="actions">
            <Button variant="contained" type="submit">
              Valider
            </Button>
          </div>
        </form>
      </Card>
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

export default AccuseReceptionForm;
