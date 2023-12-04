import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BonLivraison } from "../../../shared/types/model.types";
import Title from "../../../title/title.component";
import "./bon-livraison-list.scss";

const BonLivraisonListComponent = (props: BonLivraisonListProps) => {
  return (
    <div className="bon-livraison-list">
      <header>
        <Title text="Liste bon de livraison" />
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
              {props.bonLivraisons?.map((bon, index) => (
                <TableRow key={index}>
                  <TableCell>{bon.reference}</TableCell>
                  <TableCell>{bon.bonDeCommande.reference}</TableCell>
                  <TableCell>{bon.bonDeCommande.fournisseur.nom}</TableCell>
                  <TableCell>
                    {bon.employe.nom +
                      " " +
                      bon.employe.prenom +
                      " - " +
                      bon.employe.direction.code}
                  </TableCell>
                  <TableCell>{bon.jourReception}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default BonLivraisonListComponent;

interface BonLivraisonListProps {
  bonLivraisons: BonLivraison[];
}
