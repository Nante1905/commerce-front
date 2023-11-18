import React, { useEffect, useState } from "react";
import DemandeDetails from "../../components/demande-details/demande-details.component";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../../env";
import { Demande } from "../../types/demande.type";
import Title from "../../../title/title.component";

const DemandeDetailsRoot = () => {
  const id = useParams().id;
  const [demande, setDemande] = useState<Demande | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/demandes/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.ok) {
          console.log(response.data);

          setDemande(response.data);
        } else {
          setError(
            response.error ? response.error : "Erreur interne du serveur"
          );
        }
      })
      .catch((err) => {
        const error = err.response.data;
        setError(error.err ? error.err : "Erreur interne du serveur");
      });
  }, []);

  return (
    <div>
      <Title text={"Détails de besoin"} />
      {error && <h3 className="danger center">{error}</h3>}
      <DemandeDetails demande={demande} />
    </div>
  );
};

export default DemandeDetailsRoot;
