/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./etat-stock-form.component.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { EtatStockInput } from "../../types/Stock.type";

const EtatStockForm = (props: any) => {
  const sendForm = props.sendForm;
  const [inputs, setInputs] = useState<EtatStockInput>({
    debut: null,
    fin: null,
    article: "%",
  });

  return (
    <div className="stock_form_container">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          sendForm(inputs);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            label="Debut"
            onChange={(value: Dayjs | null) =>
              setInputs((state) => ({
                ...state,
                debut: value?.format("YYYY-MM-DD") as string | null,
              }))
            }
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            label="Fin"
            onChange={(value: Dayjs | null) =>
              setInputs((state) => ({
                ...state,
                fin: value?.format("YYYY-MM-DD") as string | null,
              }))
            }
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>

        <TextField
          label="Code article"
          onChange={(event) => {
            setInputs((state) => ({
              ...state,
              article: event.target.value,
            }));
          }}
        />
        <Button variant="contained" type="submit">
          Rechercher
        </Button>
      </form>
    </div>
  );
};

export default EtatStockForm;
