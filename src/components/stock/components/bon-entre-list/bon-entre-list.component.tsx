import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BonEntre } from "../../types/Stock.type";

export interface BonEntreListProps {
  bonEntres: BonEntre[];
}

const BonEntreList = (props: BonEntreListProps) => {
  console.log(props.bonEntres);

  return (
    <div className="bon-sortie-list">
      <section>
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Date de saisie</TableCell>
                <TableCell>Saisie par</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.bonEntres?.map((bon, index) => (
                <TableRow key={`b_${index}`}>
                  <TableCell>{bon.reference}</TableCell>
                  <TableCell>{bon.jour}</TableCell>
                  <TableCell>
                    {bon.entreStock?.employe?.nom}{" "}
                    {bon.entreStock?.employe?.prenom}
                  </TableCell>
                  <TableCell>
                    <Link to={"/bon-entree/" + bon.id}>
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

export default BonEntreList;
