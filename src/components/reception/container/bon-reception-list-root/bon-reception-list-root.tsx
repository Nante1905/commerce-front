import { useEffect, useState } from "react";
import { BonReception } from "../../../shared/types/model.types";
import BonReceptionListComponent from "../../components/bon-reception-list/bon-reception-list";
import { findAllBonReception } from "../../services/reception.services";

const BonReceptionListRoot = () => {
  const [state, setState] = useState<BonReceptionListRootState>(initialState);

  useEffect(() => {
    findAllBonReception()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          bonReceptions: res.data.data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <BonReceptionListComponent bonReceptions={state.bonReceptions} />
    </div>
  );
};

export default BonReceptionListRoot;

interface BonReceptionListRootState {
  bonReceptions: BonReception[];
}
const initialState: BonReceptionListRootState = {
  bonReceptions: [],
};
