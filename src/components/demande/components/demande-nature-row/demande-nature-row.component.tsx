import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DemandeParNature } from "../../../shared/types/demande.type";
import DemandeNatureCollapsed from "./demande-nature-collapsed.component";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainDemande } from "../../store/slice/demandeNature.slice";
import { DemandeStore } from "../../store/demande.store";

const DemandeNatureRow = (props: any) => {
  const d: DemandeParNature = props.data;
  const dataIndex = props.index;
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const checked = useSelector(
    (state: DemandeStore) => state.demandeNature.demandes[dataIndex].selected
  );

  const checkable = useSelector(
    (state: DemandeStore) => state.demandeNature.checkable
  );

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        key={`d_${dataIndex}`}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((state) => !state)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {d.article.designation}
        </TableCell>
        <TableCell align="right">
          <strong>{d.total}</strong>
        </TableCell>
        <TableCell>
          {checkable && (
            <Checkbox
              onChange={() => {
                dispatch(toggleMainDemande(dataIndex));
              }}
              checked={checked}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Jour</TableCell>
                    <TableCell>Direction</TableCell>
                    <TableCell align="center">Quantité</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {d.details.map((details, detailsIndex) => (
                    <DemandeNatureCollapsed
                      key={`details_${dataIndex}_${detailsIndex}`}
                      article={d.article}
                      details={details}
                      iArticle={dataIndex}
                      iDetails={detailsIndex}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DemandeNatureRow;
