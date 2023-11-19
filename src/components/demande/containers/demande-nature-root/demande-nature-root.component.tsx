import { useDispatch, useSelector } from "react-redux";
import Title from "../../../title/title.component";
import DemandeNature from "../../components/demande-nature/demande-nature.component";
import "./demande-nature-root.component.scss";

import React, { useEffect, useState } from "react";
import {
  DemandeNatureState,
  setDemandeNature,
} from "../../store/slice/demandeNature.slice";
import axios from "axios";
import { apiUrl } from "../../../../env";
import { DemandeStore } from "../../store/demande.store";

const DemandeNatureRoot = () => {
  document.title = "Besoin par nature";
  const demandes = useSelector(
    (state: DemandeStore) => state.demandeNature.demandes
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LOADING DATA");

    axios
      .get(`${apiUrl}/demandes/nature/service`)
      .then((res) => {
        const response = res.data;

        if (response.ok) {
          dispatch(setDemandeNature(response.data));
          console.log(demandes);
        } else {
          setError(response.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Title text={"Besoins par nature"} />
      {error && <h3 className="danger center">{error}</h3>}

      <DemandeNature demandes={demandes} />
    </div>
  );
};

export default DemandeNatureRoot;
