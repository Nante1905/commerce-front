import {
  Alert,
  AlertColor,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Article } from "../../../../types/item.type";
import DetailsArticleQte, {
  DetailsArticleQteType,
} from "../../../shared/components/details-article-qte/details-article-qte";
import { BonLivraison } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import { insertBonReception } from "../../services/reception.services";
import { bonLivraisonDetailsToArticleQte } from "../../utils/bon-reception.utils";
import "./bon-reception-form.scss";

const BonReceptionFormComponent = (props: BonReceptionFormProps) => {
  const [state, setState] = useState<BonReceptionFormState>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("state", state.form);
    setState((prevState) => ({
      ...prevState,
      saisieLoading: true,
    }));
    insertBonReception(state.form)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          saisieLoading: false,
          saisieSuccess: true,
          saisieMessage: res.data.message,
          severity: "success",
        }));
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          saisieLoading: false,
          saisieFail: true,
          saisieMessage: error.response.data.message,
          severity: "error",
        }));
      });
  };

  return (
    <div className="bon-reception-form">
      <div className="header">
        <Title text="Saisie bon de réception" />
      </div>
      <div className="content">
        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-item">
              <FormControl className="input" sx={{ width: 200 }}>
                <InputLabel id="select-label">Bon de livraison</InputLabel>

                <Select
                  labelId="select-label"
                  id="select"
                  label="Bon de livraison"
                  onChange={(event) => {
                    setState((prevState) => ({
                      ...prevState,
                      form: {
                        ...prevState.form,
                        bonDeLivraison: {
                          id: event.target.value as number,
                        },
                        details: bonLivraisonDetailsToArticleQte(
                          props.bonLivraisons.filter(
                            (e) => e.id === event.target.value
                          )[0]
                        ),
                      },
                    }));
                  }}
                  required
                >
                  {props.bonLivraisons.map((e, index) => (
                    <MenuItem key={index} value={e.id}>
                      {e.reference}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <br />
            <h4>Details</h4>
            <div className="form-item">
              <DetailsArticleQte
                articles={props.articles}
                withPu={false}
                details={state.form.details}
                onDataChange={(data) => console.log(data)}
              />
            </div>
            <Button variant="contained" type="submit">
              {state.saisieLoading ? (
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "white",
                  }}
                />
              ) : (
                "Valider"
              )}
            </Button>
          </form>
        </div>
      </div>
      <Snackbar open={state.saisieSuccess || state.saisieFail}>
        <Alert severity={state.severity}>{state.saisieMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default BonReceptionFormComponent;

interface BonReceptionFormProps {
  bonLivraisons: BonLivraison[];
  articles: Article[];
}

interface BonReceptionFormState {
  form: {
    bonDeLivraison: {
      id: number;
    };
    details: DetailsArticleQteType[];
  };
  saisieSuccess: boolean;
  saisieFail: boolean;
  saisieLoading: boolean;
  saisieMessage: string;
  severity: AlertColor | undefined;
}
const initialState: BonReceptionFormState = {
  form: {
    bonDeLivraison: {
      id: 0,
    },
    details: [],
  },
  saisieSuccess: false,
  saisieFail: false,
  saisieLoading: false,
  saisieMessage: "",
  severity: undefined,
};
