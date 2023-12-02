import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../title/title.component";
import { findAllBonCommandeNonValider } from "../../service/bon.service";
import { BonCommande } from "../../types/bon-commande.types";
import "./list-bon-commande.scss";

const ListBonCommandeComponent = () => {
  const [state, setState] = useState<ListBonCommandeState>(initialState);

  useEffect(() => {
    findAllBonCommandeNonValider()
      .then((res) => {
        setState((state) => ({
          ...state,
          bons: res.data.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="list-bon-commande">
      <header>
        <Title text="Liste bon de commande" />
        <h5>Non validés</h5>
      </header>
      <section className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Date creation</TableCell>
              <TableCell>Fournisseur</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.bons?.map((bon, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bon.reference}</TableCell>
                <TableCell>{bon.dateCreation}</TableCell>
                <TableCell>{bon.fournisseur.nom}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Link to={`/bon-commandes/${bon.id}`}>
                    <Button variant="contained">Details</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    Valider
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default ListBonCommandeComponent;

interface ListBonCommandeState {
  bons: BonCommande[];
}
const initialState: ListBonCommandeState = {
  bons: [],
};
