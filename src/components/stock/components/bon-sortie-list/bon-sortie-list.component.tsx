import "./bon-sortie-list.component.scss";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BonSortie } from "../../types/Stock.type";

export interface BonSortieListProps {
  bonSorties: BonSortie[];
}

const BonSortieList = (props: BonSortieListProps) => {
  return (
    <div className="bon-sortie-list">
      <section>
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Date de saisie</TableCell>
                <TableCell>Type de sortie</TableCell>
                <TableCell>Destinataire</TableCell>
                <TableCell>Saisie par</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bonSorties?.map((bon, index) => (
                <TableRow key={`b_${index}`}>
                  <TableCell>{bon.reference}</TableCell>
                  <TableCell>{bon.sortie.jour}</TableCell>
                  <TableCell>{bon.sortie.type?.nom}</TableCell>
                  <TableCell>{bon.sortie.direction?.nom}</TableCell>
                  <TableCell>
                    {bon.sortie.employe?.nom} {bon.sortie.employe?.prenom}
                  </TableCell>
                  <TableCell>
                    <Link to={"/bon-sortie/" + bon.id}>
                      <Button variant="contained" color="primary">
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default BonSortieList;
