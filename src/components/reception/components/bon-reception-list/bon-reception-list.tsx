import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BonReception } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import "./bon-reception-list.scss";

const BonReceptionListComponent = (props: BonReceptionListProps) => {
  console.log("bon", props.bonReceptions);
  return (
    <div className="bon-reception-list">
      <div className="header">
        <Title text="Liste des bons de réception" />
      </div>
      <div className="content">
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Livraison</TableCell>
                <TableCell>Date de reception</TableCell>
                <TableCell>Saisie de</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bonReceptions?.map((bon, index) => (
                <TableRow key={index}>
                  <TableCell>{bon.reference}</TableCell>
                  <TableCell>{bon.bonDeLivraison.reference}</TableCell>
                  <TableCell>{bon.jour}</TableCell>
                  <TableCell>
                    {bon.employe.nom +
                      " " +
                      bon.employe.prenom +
                      " - " +
                      bon.employe.direction.code}
                  </TableCell>
                  <TableCell>
                    <Link to={`/bon-reception/${bon.id}`}>
                      <Button variant="contained">Voir</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BonReceptionListComponent;

interface BonReceptionListProps {
  bonReceptions: BonReception[];
}
