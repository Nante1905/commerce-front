import { useEffect } from "react";
import DemandeListComponent from "../../components/demande-list/demande-list.component";
import { findAllDemandes } from "../../services/demande.service";
import { demandeStore } from "../../store/demande.store";
import { findDemandeSuccess } from "../../store/slice/demande.slice";
import "./demande-list-root.component.scss";

const DemandeListRoot = () => {
  useEffect(() => {
    findAllDemandes()
      .then((res) => {
        demandeStore.dispatch(findDemandeSuccess(res.data.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="demande-list-root">
      <DemandeListComponent />
    </div>
  );
};

export default DemandeListRoot;
