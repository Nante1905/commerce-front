import "../../../demande/containers/demande-nature-root/demande-nature-root.component.scss";
import "./demande-proforma-root.component.scss";

import { Alert, Button, Snackbar } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../../env";
import DemandeNature from "../../../demande/components/demande-nature/demande-nature.component";
import { DemandeStore } from "../../../demande/store/demande.store";
import {
  setChecking,
  setDemandeNature,
} from "../../../demande/store/slice/demandeNature.slice";
import { httpClient } from "../../../shared/services/interceptor/axios.interceptor";
import { DemandeParNature } from "../../../shared/types/demande.type";
import Title from "../../../title/title.component";
import ProformaModal from "../../components/proforma-modal/proforma-modal.component";
import {
  findFournisseurOf,
  sendDemande,
} from "../../services/proforma.service";
import { ProformaState, initialState } from "../../types/proforma.types";

const DemandeProformaRoot = () => {
  document.title = "Besoin par nature";
  const demandes = useSelector(
    (state: DemandeStore) => state.demandeNature.demandes
  );

  const [proformaState, setProformaState] =
    useState<ProformaState>(initialState);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    httpClient
      .get(`${apiUrl}/demandes/nature/valide`)
      .then((res) => {
        const response = res.data;

        if (response.ok) {
          const data: DemandeParNature[] = response.data;

          dispatch(setDemandeNature(data));
          dispatch(setChecking(false));
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setProformaState((state: ProformaState) => ({
      ...state,
      articlesIds: demandes.map((d) => d.article.id),
      demandesIds: _.uniq(
        demandes.map((d) => d.details.map((d) => d.idDemande)).flat()
      ),
    }));

    findFournisseurOf(proformaState.articlesIds)
      .then((res) => {
        if (res.data.ok) {
          setProformaState((proformaState: ProformaState) => ({
            ...proformaState,
            fournisseurs: res.data.data,
          }));
          console.log(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [demandes]);

  const sendProforma = () => {
    setOpenModal(true);
    console.log(proformaState);
  };

  const handleSubmitModal = (fournisseurs: number[], livraison: string) => {
    console.log(livraison, fournisseurs, proformaState.demandesIds);
    if (fournisseurs.length < 3 && proformaState.fournisseurs.length >= 3) {
      setProformaState((state) => ({
        ...state,
        formError: true,
      }));
      return false;
    }

    setProformaState((state) => ({
      ...state,
      modal: {
        ...state.modal,
        sendLoading: true,
      },
    }));

    sendDemande(livraison, fournisseurs, proformaState.demandesIds)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          setProformaState((state) => ({
            ...state,
            modal: {
              sendLoading: false,
              sendSuccess: true,
              message: res.data.message,
            },
          }));
        } else {
          setError(res.data.error);
        }
      })
      .catch((err) => console.log(err));
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
      <ProformaModal
        fournisseurs={proformaState.fournisseurs}
        open={openModal}
        closeModal={() => setOpenModal(false)}
        onModalSubmit={handleSubmitModal}
        modal={proformaState.modal}
      />
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
      <Snackbar
        open={proformaState.formError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          "Vous devez choisir au moins 3 fournisseurs
        </Alert>
      </Snackbar>
    </>
  );
};

export default DemandeProformaRoot;
