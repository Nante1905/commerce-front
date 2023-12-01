import { DeleteRounded } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import { DemandeStore } from "../../store/demande.store";
import {
  addDetails,
  dropBesoin,
  setArticles,
  setBesoinArticle,
  setBesoinDirection,
  setBesoinQte,
  setDirections,
} from "../../store/slice/demande.slice";
import "./demande-form.component.scss";

const DemandeForm = () => {
  const dispatch = useDispatch();
  const directions = useSelector(
    (state: DemandeStore) => state.demande.directions
  );
  const user = useSelector((state: DemandeStore) => state.authetication.user);

  const details = useSelector(
    (state: DemandeStore) => state.demande.form.details
  );
  const articles = useSelector((state: DemandeStore) => state.demande.articles);
  const form = useSelector((state: DemandeStore) => state.demande.form);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    httpClient
      .get("http://localhost:8080/directions")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          dispatch(setDirections(response.data));
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    httpClient
      .get("http://localhost:8080/articles")
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          dispatch(setArticles(response.data));
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    dispatch(setBesoinDirection(user?.direction.id));
    console.log(user?.direction.id);
  }, [user]);

  const sendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    httpClient
      .post("http://localhost:8080/demandes", form)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          setMessage(
            response.message ? response.message : "Insertion de besoins réussie"
          );
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="demande-form-container">
      <Card className="card">
        <form className="form" onSubmit={(event) => sendForm(event)}>
          <div className="input-flex">
            <FormControl className="input" sx={{ width: 200 }}>
              <InputLabel id="select-label">Direction</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label="Direction"
                onChange={(event) => {
                  dispatch(setBesoinDirection(event.target.value as number));
                }}
                value={user?.direction.id ? user.direction.id : ""}
                required
                disabled
              >
                {directions.map((d, index) => (
                  <MenuItem key={`d_${index}`} value={d.id}>
                    {d.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="details-container">
            <h3 className="center">Détails</h3>
            {details.map((details, index) => (
              <div className="input-flex" key={`dtl_${index}`}>
                <FormControl className="input" sx={{ width: 200 }}>
                  <InputLabel id="select-label">Article</InputLabel>

                  <Select
                    labelId="select-label"
                    id="select"
                    label="Article"
                    value={details.idArticle > 0 ? details.idArticle : ""}
                    onChange={(event) => {
                      dispatch(
                        setBesoinArticle({
                          index,
                          value: event.target.value as number,
                        })
                      );
                    }}
                    required
                  >
                    {articles.map((a, index) => (
                      <MenuItem key={`a_${index}`} value={a.id}>
                        {a.reference} - {a.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <div className="flex"> */}
                <FormControl>
                  <TextField
                    label="Quantité"
                    value={details.quantite > 0 ? details.quantite : ""}
                    onChange={(event) => {
                      dispatch(
                        setBesoinQte({ index, value: event.target.value })
                      );
                    }}
                    required
                  />
                </FormControl>
                <Button onClick={() => dispatch(dropBesoin(index))}>
                  <DeleteRounded className="icon danger" />
                </Button>
                {/* </div> */}
              </div>
            ))}

            <p className="add-item" onClick={() => dispatch(addDetails())}>
              <AddCircleIcon className="icon" /> Ajouter un autre article
            </p>
          </div>

          <div className="input-flex">
            <Button variant="contained" type="submit">
              Insérer
            </Button>
          </div>
        </form>
      </Card>
      <Snackbar
        open={message != null}
        onClose={() => {
          setMessage(null);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => {
            setMessage(null);
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error != null}
        onClose={() => {
          setError(null);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DemandeForm;
