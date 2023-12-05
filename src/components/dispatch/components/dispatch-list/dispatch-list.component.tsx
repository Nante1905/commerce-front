import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BonSortie } from "../../../stock/types/Stock.type";
import { Link } from "react-router-dom";

interface DispatchListProps {
  bonSorties: BonSortie[];
}

const renderStatut = (status: number, label: string) => {
  if (status == 0) {
    return <Chip label={label} className="div-warning" />;
  } else if (status == 5) {
    return <Chip label={label} className="div-success" />;
  }
};

const DispatchList = (props: DispatchListProps) => {
  document.title = "Dispatch des articles";
  return (
    <div className="bon-sortie-list">
      <section>
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Envoyé par</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bonSorties?.map((bon, index) => (
                <TableRow key={`b_${index}`}>
                  <TableCell>{bon.reference}</TableCell>
                  <TableCell>{bon.sortie.jour}</TableCell>
                  <TableCell>
                    {bon.sortie.employe?.nom} {bon.sortie.employe?.prenom}
                  </TableCell>
                  <TableCell>
                    {renderStatut(
                      bon.status as number,
                      bon.statusString as string
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={"/bon-sortie/" + bon.id}>
                      <Button variant="contained" color="primary">
                        Détails
                      </Button>
                    </Link>
                  </TableCell>
                  {bon.status == 0 && (
                    <TableCell>
                      <Link to={"/bon-sortie/" + bon.id + "/confirmation"}>
                        <Button variant="contained" color="primary">
                          Saisir l'accusé de réception
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default DispatchList;
