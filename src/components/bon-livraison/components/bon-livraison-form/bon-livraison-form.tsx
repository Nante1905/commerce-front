import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import { Article } from "../../../../types/item.type";
import { BonCommande } from "../../../bon-de-commande/types/bon-commande.types";
import DetailsArticleQte, {
  DetailsArticleQteType,
} from "../../../shared/components/details-article-qte/details-article-qte";
import Title from "../../../title/title.component";
import { insertBonLivraison } from "../../services/bon-livraison.service";
import { bonCommandeDetailsToArticleQteDetails } from "../../utils/bon-livraison.utils";
import "./bon-livraison-form.scss";

const BonLivraisonFormComponent = (props: BonLivraisonFormComponentProps) => {
  const [state, setState] = useState(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    insertBonLivraison(state.form)
      .then((res) => {
        console.log(res);
        if (res.data.data.ok) {
          setState((state) => ({
            ...state,
            insertSuccess: true,
            insertMessage: res.data.data.message,
          }));
        } else if (res.data.data.ok === false) {
          setState((state) => ({
            ...state,
            insertFail: true,
            insertMessage: res.data.data.err,
          }));
        }
      })
      .catch((err) => {
        console.log(err);

        setState((state) => ({
          ...state,
          insertFail: true,
          insertMessage: err.response.data.message || err.response.data,
        }));
      });
  };

  return (
    <div className="bon-livraison-form">
      <header>
        <Title text="Saisie bon de livraison" />
      </header>
      <section>
        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-item">
              <TextField
                label="Reference"
                onChange={(event) =>
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      reference: event.target.value,
                    },
                  }))
                }
              />
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
                        jourSortie: value?.format("YYYY-MM-DD") as string,
                      },
                    }))
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </div>
            <div className="form-item">
              <FormControl className="input" sx={{ width: 200 }}>
                <InputLabel id="select-label">Bon de commande</InputLabel>

                <Select
                  labelId="select-label"
                  id="select"
                  label="Bon de commande"
                  onChange={(event) => {
                    setState((state) => ({
                      ...state,
                      form: {
                        ...state.form,
                        bonDeCommande: {
                          id: event.target.value as number,
                        },
                        details: bonCommandeDetailsToArticleQteDetails(
                          props.bonCommandes.filter(
                            (b) => b.id == event.target.value
                          )[0].details
                        ),
                      },
                    }));
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
              <h4>Details</h4>
              <DetailsArticleQte
                articles={props.articles}
                withPu={false}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" type="submit">
                Valider
              </Button>
            </div>
          </form>
        </div>
      </section>
      <Snackbar open={state.insertSuccess || state.insertFail}>
        <Alert severity={state.insertSuccess ? "success" : "error"}>
          {state.insertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BonLivraisonFormComponent;

interface BonLivraisonFormComponentProps {
  articles: Article[];
  bonCommandes: BonCommande[];
}

interface BonLivraisonFormComponentState {
  form: {
    reference: string;
    bonDeCommande: {
      id: number;
    };
    jourSortie: string;
    details: DetailsArticleQteType[];
  };
  insertSuccess: boolean;
  insertFail: boolean;
  insertMessage: string;
}

const initialState: BonLivraisonFormComponentState = {
  form: {
    reference: "",
    bonDeCommande: {
      id: 0,
    },
    jourSortie: "",
    details: [],
  },
  insertSuccess: false,
  insertFail: false,
  insertMessage: "",
};
