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

const DemandeNatureRow = (props: any) => {
  const d = props.data;
  const dataIndex = props.index;
  const [open, setOpen] = useState<boolean>(false);

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
        <TableCell align="right">{d.total}</TableCell>
        <TableCell>
          <Checkbox
            // onChange={() =>
            //   dispatch(
            //     updateValueAnswer({
            //       questionId: numero,
            //       id: id,
            //     })
            //   )
            // }
            checked
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Direction</TableCell>
                    <TableCell align="center">Quantité</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {d.details.map((details, detailsIndex) => (
                    <>
                      <TableRow key={`details_${dataIndex}_${detailsIndex}`}>
                        <TableCell></TableCell>
                        <TableCell>{details.direction.nom}</TableCell>
                        <TableCell align="right">{details.quantite}</TableCell>
                      </TableRow>
                    </>
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
