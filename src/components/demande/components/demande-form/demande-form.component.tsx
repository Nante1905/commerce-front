import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./demande-form.component.scss";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  addDetails,
  dropBesoin,
  setArticles,
  setBesoinArticle,
  setBesoinDirection,
  setBesoinQte,
  setDirections,
} from "../../store/slice/demande.slice";
import { DemandeStore } from "../../store/demande.store";
import {
  DeleteOutline,
  DeleteRounded,
  DeleteTwoTone,
} from "@mui/icons-material";

const DemandeForm = () => {
  const dispatch = useDispatch();
  const directions = useSelector(
    (state: DemandeStore) => state.demande.directions
  );
  const details = useSelector(
    (state: DemandeStore) => state.demande.form.details
  );
  const articles = useSelector((state: DemandeStore) => state.demande.articles);

  useEffect(() => {
    dispatch(
      setDirections([
        { id: 1, nom: "Direction SI" },
        { id: 2, nom: "Direction Compta" },
      ])
    );

    dispatch(
      setArticles([
        { id: 1, ref: "B10", designation: "Cahier" },
        { id: 2, ref: "B20", designation: "Stylo" },
      ])
    );
  }, []);

  return (
    <div className="demande-form-container">
      <Card className="card">
        <form className="form">
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
                required
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
                    value={details.article.id > 0 ? details.article.id : null}
                    onChange={(event) => {
                      dispatch(
                        setBesoinArticle({ index, value: event.target.value })
                      );
                    }}
                    required
                  >
                    {articles.map((a, index) => (
                      <MenuItem key={`a_${index}`} value={a.id}>
                        {a.ref} - {a.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <div className="flex"> */}
                <FormControl>
                  <TextField
                    label="Quantité"
                    value={details.quantite > 0 ? details.quantite : null}
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
    </div>
  );
};

export default DemandeForm;
