import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Article } from "../../../../types/item.type";
import DetailsArticleQte from "../../../shared/components/details-article-qte/details-article-qte";
import { HT, TTC } from "../../constants/proforma.constant";
import { sendReponse } from "../../services/proforma.service";
import { DetailsResultatProforma } from "../../types/proforma.types";
import "./saisie-reponse-proforma.scss";

const SaisieReponseProformaComponent = (props: SaisieReponseProformaProps) => {
  const [state, setState] = useState<SaisieReponseProformaState>(initialState);

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(state.form);
    sendReponse(props.id, state.form)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="saisie-proforma">
      <div className="form">
        <form onSubmit={onSubmit}>
          <FormControl
            style={{
              width: "20%",
            }}
          >
            <InputLabel>Prix</InputLabel>
            <Select
              label="Prix"
              onChange={(event) => {
                setState((state) => ({
                  ...state,
                  form: {
                    ...state.form,
                    formatPrix: event.target.value as number,
                  },
                }));
              }}
            >
              <MenuItem value={TTC}>TTC</MenuItem>
              <MenuItem value={HT}>HT</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                label="Date delai livraison"
                onChange={(value: Dayjs | null) =>
                  setState((state) => ({
                    ...state,
                    form: {
                      ...state.form,
                      delaiLivraison: value?.format("YYYY-MM-DD") as string,
                    },
                  }))
                }
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </FormControl>
          <br />
          <br />
          <h5>Details</h5>
          <br />
          <DetailsArticleQte
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
          />
          <Button type="submit" variant="contained">
            Valider
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SaisieReponseProformaComponent;

interface SaisieReponseProformaProps {
  articles: Article[];
  id: string;
}

interface SaisieReponseProformaState {
  form: {
    formatPrix: number;
    delaiLivraison: string;
    details: DetailsResultatProforma[];
  };
}

const initialState: SaisieReponseProformaState = {
  form: {
    formatPrix: 0,
    delaiLivraison: "",
    details: [],
  },
};
