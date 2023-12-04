import "./sortie-stock-form.component.scss";
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
import DetailsArticleQte, {
  DetailsArticleQteType,
} from "../../../shared/components/details-article-qte/details-article-qte";
import { SortieStockState } from "../../types/Stock.state";
import {
  DetailsSortieStock,
  SortieStock,
  TypeSortie,
} from "../../types/Stock.type";
import { FormEvent, useState } from "react";
import { Article, Direction } from "../../../../types/item.type";
import { Dayjs } from "dayjs";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";

export interface SortieStockFormProps {
  types: TypeSortie[];
  directions: Direction[];
  articles: Article[];
}

interface SortieStockFormState {
  form: SortieStock;
  error: string;
  message: string;
}

const SortieStockForm = (props: SortieStockFormProps) => {
  const types = props.types;
  const directions = props.directions;
  const articles = props.articles;
  const initialFormState: SortieStock = {
    jour: null,
    type: null,
    destinataire: null,
    details: [],
  };

  const [state, setState] = useState<SortieStockFormState>({
    form: initialFormState,
    error: "",
    message: "",
  });

  const hideDestinataire = (idType: number): boolean => {
    return types
      .filter((t) => t.id == idType)[0]
      ?.nom?.toLowerCase()
      .includes("dispatch") as boolean;
  };

  const castToDetailsStock = (
    data: DetailsArticleQteType[]
  ): DetailsSortieStock[] => {
    let details: DetailsSortieStock[] = [];
    data.map((d) => {
      details.push({
        article: { id: d.article.id },
        qte: d.quantiteDispo,
      });
    });
    return details;
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.form.details.length == 0) {
      setState((state) => ({ ...state, error: "Ajoutez des articles" }));
    } else {
      httpClient
        .post("/sortie-stock", state.form)
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
              <InputLabel id="select-label">Type de sortie</InputLabel>

              <Select
                labelId="select-label"
                id="select"
                label="Type de sortie"
                required
                onChange={(event) => {
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      type: { id: event.target.value as number },
                    },
                  }));
                  if (hideDestinataire(event.target.value as number) == false) {
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        destinataire: null,
                      },
                    }));
                  }
                }}
              >
                {types?.map((type, index) => (
                  <MenuItem value={type.id} key={`type_${index}`}>
                    {type.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {hideDestinataire(state.form.type?.id as number) && (
              <FormControl style={{ width: "30%" }}>
                <InputLabel id="select-label">Destinataire</InputLabel>

                <Select
                  labelId="select-label"
                  id="select"
                  label="Destinataire"
                  required
                  onChange={(event) => {
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        destinataire: {
                          id: event.target.value as number,
                        },
                      },
                    }));
                  }}
                >
                  {directions?.map((direction, index) => (
                    <MenuItem value={direction.id} key={`dir_${index}`}>
                      {direction.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <h4 className="center subtitle ">Détails</h4>
          <DetailsArticleQte
            articles={articles}
            onDataChange={(data) => {
              setState((state) => ({
                ...state,
                form: {
                  ...state.form,
                  details: castToDetailsStock(data),
                },
              }));
              console.log("Article");
            }}
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

export default SortieStockForm;
