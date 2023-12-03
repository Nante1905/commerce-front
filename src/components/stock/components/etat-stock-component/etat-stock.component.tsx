import {
  Button,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../../../title/title.component";
import "./etat-stock.component.scss";
import generatePDF from "react-to-pdf";
import { CloudDownload } from "@mui/icons-material";
import { useRef } from "react";
import { EtatStock } from "../../types/Stock.type";

const EtatStockComponent = (props: any) => {
  const stock: EtatStock = props.stock;
  const targetRef = useRef<HTMLElement | null>(null);
  console.log(stock);

  return (
    <div className="etat-stock">
      <Button
        variant="contained"
        onClick={() =>
          generatePDF(targetRef, {
            filename: `etat-stock-${stock.debut}-${stock.fin}.pdf`,
          })
        }
      >
        <CloudDownload
          style={{
            marginRight: ".5rem",
          }}
        />{" "}
        PDF
      </Button>
      {stock != null && (
        <section className="stock" ref={targetRef}>
          <div className="en-tete">
            <div className="title">
              <h1>Etat de stock</h1>
            </div>
            <div className="etat_stock_inputs">
              <p>
                Du {stock.debut ? stock.debut : "--"}
                au {stock.fin ? stock.fin : "--"}
              </p>
            </div>
          </div>
          <div className="etat-stock-table">
            <Table>
              <TableHead className="table_head">
                <TableRow>
                  <TableCell>Code article</TableCell>
                  <TableCell>Désignation</TableCell>
                  <TableCell>Quantité initiale</TableCell>
                  <TableCell>Quantité entrée</TableCell>
                  <TableCell>Quantité sortie</TableCell>
                  <TableCell>Reste</TableCell>
                  {stock.avecMontant && <TableCell>Montant (HT)</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.details.map((s, index) => (
                  <TableRow key={`stock_${index}`}>
                    <TableCell>{s.article.reference}</TableCell>
                    <TableCell>{s.article.designation}</TableCell>
                    <TableCell align="right">
                      {s.qteInitial.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {s.qteEntre.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {s.qteSortie.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {s.reste?.toLocaleString()}
                    </TableCell>
                    {stock.avecMontant && (
                      <TableCell align="right">
                        {" "}
                        {s.montant?.toLocaleString()} MGA{" "}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {stock.avecMontant && (
                  <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="row-info" align="center">
                      Total (HT)
                    </TableCell>
                    <TableCell align="right" className="strong ">
                      {stock.montantTotal?.toLocaleString()} MGA
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </div>
  );
};

export default EtatStockComponent;
