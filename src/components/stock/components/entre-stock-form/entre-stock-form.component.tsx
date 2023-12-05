import "./entre-stock-form.component.scss";

import {
  Alert,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DetailsArticleQte from "../../../shared/components/details-article-qte/details-article-qte";
import {
  BonReception,
  BonReceptionDetails,
  EntreStock,
} from "../../types/Stock.type";
import { FormEvent, useState } from "react";
import { Dayjs } from "dayjs";
import { BonCommandeDetails } from "../../../bon-de-commande/types/bon-commande.types";
import {
  DetailsStockToDetailsArticleQteType,
  castToDetailsStock,
} from "../../services/stock.service";
import { Article } from "../../../../types/item.type";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";

export interface EntreStockFormProps {
  bonReceptions: BonReception[];
  articles: Article[];
}

interface EntreStockFormState {
  form: EntreStock;
  error: string;
  message: string;
}

const EntreStockForm = (props: EntreStockFormProps) => {
  const [state, setState] = useState<EntreStockFormState>({
    form: {
      jour: null,
      bonReception: null,
      details: [],
    },
    error: "",
    message: "",
  });

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.form.details.length == 0) {
      setState((state) => ({ ...state, error: "Ajoutez des articles" }));
    } else {
      console.log("SENDING DATA ", state.form);

      httpClient
        .post("/entre-stock", state.form)
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
            <FormControl style={{ width: "30%" }} required>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  label="Date"
                  onChange={(value: Dayjs | null) => {
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        jour: value?.format("YYYY-MM-DD") as string,
                      },
                    }));
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl style={{ width: "30%" }}>
              <InputLabel id="select-label">Bon de réception</InputLabel>

              <Select
                labelId="select-label"
                id="select"
                label="Bon de réception"
                required
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      bonReception: { id: event.target.value as number },
                      details: DetailsStockToDetailsArticleQteType(
                        props.bonReceptions.filter(
                          (f) => f.id == event.target.value
                        )[0]?.details as BonReceptionDetails[]
                      ),
                    },
                  }));
                }}
              >
                {props.bonReceptions?.map((bon, index) => (
                  <MenuItem value={bon.id} key={`bon_${index}`}>
                    {bon.reference}
                  </MenuItem>
                ))}
              </Select>
              {props.bonReceptions.length == 0 && (
                <p>Aucun bon de réception valide</p>
              )}
            </FormControl>
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

export default EntreStockForm;
