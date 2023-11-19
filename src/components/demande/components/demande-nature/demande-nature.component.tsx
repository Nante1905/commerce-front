import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./demande-nature.component.scss";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import React, { useState } from "react";
import DemandeNatureRow from "../demande-nature-row/demande-nature-row.component";
import { DemandeParNature } from "../../types/demande.type";

const DemandeNature = (props: any) => {
  const data = props.demandes;

  const render = () => {
    if (data) {
      return (
        <div className="demande-nature-container">
          <TableContainer>
            <Table aria-label="collapsible table" className="table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="large-cell">Article</TableCell>
                  <TableCell className="large-cell" align="center">
                    Total
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, index) => (
                  <DemandeNatureRow data={d} index={index} key={`d_${index}`} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    return <CircularProgress />;
  };

  return <>{render()}</>;
};

export default DemandeNature;
