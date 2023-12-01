import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DemandeProformaDetails } from "../../types/proforma.types";
import "./demande-profoma-list.scss";

const DemandeProformaListComponent = (props: DemandeProformaListProps) => {
  return (
    <div className="demande-proforma-list">
      <section className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Fournisseur</TableCell>
              <TableCell>Fournisseur mail</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.demandes?.map((demande, index) => (
              <TableRow key={demande.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{demande.reference}</TableCell>
                <TableCell>{demande.demandeProforma.jourDemande}</TableCell>
                <TableCell>{demande.fournisseur.nom}</TableCell>
                <TableCell>{demande.fournisseur.email}</TableCell>
                <TableCell>
                  <Link to={`/proforma/${demande.id}/reponse`}>
                    <Button variant="contained">
                      Saisir Resultat proforma
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default DemandeProformaListComponent;

interface DemandeProformaListProps {
  demandes: DemandeProformaDetails[];
}
