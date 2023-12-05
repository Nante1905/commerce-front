import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Facture } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import "./facture-list.scss";

const FactureListComponent = (props: FactureListProps) => {
  return (
    <div className="facture-list">
      <header>
        <Title text="Liste factures" />
      </header>
      <section>
        <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Reference Commande</TableCell>
                <TableCell>Fournisseur</TableCell>
                <TableCell>Saisie de</TableCell>
                <TableCell>Date de saisie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.factures?.map((facture, index) => (
                <TableRow key={index}>
                  <TableCell>{facture.reference}</TableCell>
                  <TableCell>{facture.bonDeCommande.reference}</TableCell>
                  <TableCell>{facture.bonDeCommande.fournisseur.nom}</TableCell>
                  <TableCell>
                    {facture.employe.nom +
                      " " +
                      facture.employe.prenom +
                      " - " +
                      facture.employe.direction.code}
                  </TableCell>
                  <TableCell>{facture.jour}</TableCell>
                  <TableCell>
                    <Link to={"/facture/" + facture.id}>
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

export default FactureListComponent;

interface FactureListProps {
  factures: Facture[];
}
