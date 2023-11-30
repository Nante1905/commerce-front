import "./demande-proforma-root.component.scss";
import "../../../demande/containers/demande-nature-root/demande-nature-root.component.scss";

import { useDispatch, useSelector } from "react-redux";
import Title from "../../../title/title.component";
import { DemandeStore } from "../../../demande/store/demande.store";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../../env";
import { DemandeParNature } from "../../../shared/types/demande.type";
import {
  setChecking,
  setDemandeNature,
} from "../../../demande/store/slice/demandeNature.slice";
import DemandeNature from "../../../demande/components/demande-nature/demande-nature.component";
import { Alert, Button, Snackbar } from "@mui/material";
import ProformaModal from "../../components/proforma-modal/proforma-modal.component";

const DemandeProformaRoot = () => {
  document.title = "Besoin par nature";
  const demandes = useSelector(
    (state: DemandeStore) => state.demandeNature.demandes
  );
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LOADING DATA");

    axios
      .get(`${apiUrl}/demandes/nature/valide`)
      .then((res) => {
        const response = res.data;

        if (response.ok) {
          console.log("SETTING");
          console.log(response.data);
          const data: DemandeParNature[] = response.data;

          dispatch(setDemandeNature(data));
          dispatch(setChecking(false));
          console.log(demandes);
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sendProforma = () => {
    console.log("opening modal");

    setOpenModal(true);
    // let selected: SelectedDetails[] = [];
    // let rejected: SelectedDetails[] = [];
    // let idDemandes = new Set();
    // demandes.map((d) => {
    //   d.details.map((details) => {
    //     if (details.selected) {
    //       selected.push({ article: d.article.id, demande: details.idDemande });
    //     } else {
    //       rejected.push({ article: d.article.id, demande: details.idDemande });
    //     }
    //     idDemandes.add(details.idDemande);
    //   });
    // });
    // axios
    //   .post(`${apiUrl}/demandes/validation`, {
    //     selected,
    //     rejected,
    //   })
    //   .then((res) => {
    //     const response = res.data;
    //     console.log(response);
    //     if (response.ok) {
    //       setMessage(response.message);
    //     } else {
    //       setError(response.error);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <>
      <div>
        <Title text={"Besoins par nature"} />

        <DemandeNature demandes={demandes} />
        {demandes.length != 0 && (
          <div className="div-actions">
            <Button variant="contained" onClick={() => sendProforma()}>
              Envoyer une demande de proforma
            </Button>
          </div>
        )}
      </div>
      <ProformaModal open={openModal} />
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
    </>
  );
};

export default DemandeProformaRoot;
