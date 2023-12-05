import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Article } from "../../../../types/item.type";

const DetailsArticleQte = (props: DetailsArticleQteProps) => {
  const [state, setState] = useState<DetailsArticleQteState>(initialState);

  const handleChangeArticle = (
    index: number,
    event: SelectChangeEvent<unknown>,
    state: DetailsArticleQteState
  ) => {
    const form = { ...state.form };
    form.details[index].article.id = Number(event.target.value);
    setState((state) => ({
      ...state,
      form: form,
    }));
    props.onDataChange(state.form.details);
  };

  const handleChangeQte = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: DetailsArticleQteState
  ) => {
    const form = { ...state.form };
    form.details[index].qte = Number(event.target.value);
    setState((state) => ({
      ...state,
      form: form,
    }));
    props.onDataChange(state.form.details);
  };

  const handleChangePu = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: DetailsArticleQteState
  ) => {
    const form = { ...state.form };
    form.details[index].pu = Number(event.target.value);
    setState((state) => ({
      ...state,
      form: form,
    }));
    props.onDataChange(state.form.details);
  };

  const handleAddElement = () => {
    const form = { ...state.form };
    form.details.push({
      article: {
        id: 1,
      },
      qte: 0,
      pu: 0,
    });
    setState((state) => ({
      ...state,
      form: form,
    }));
    props.onDataChange(state.form.details);
  };

  const handleDeleteElement = (index: number) => {
    const form = { ...state.form };
    form.details.splice(index, 1);
    setState((state) => ({
      ...state,
      form: form,
    }));
    props.onDataChange(state.form.details);
  };

  // const details = (props: DetailsArticleQteProps): DetailsArticleQteType[] =>
  //   props?.details ? props.details : state.form.details;

  useEffect(() => {
    if (props?.details) {
      setState((state) => ({
        ...state,
        form: {
          ...state.form,
          details: props?.details as DetailsArticleQteType[],
        },
      }));
    }
  }, [props.details]);

  return (
    <div>
      {state.form.details.map((detail, index) => (
        <div className="details" key={index}>
          <>
            <FormControl style={{ width: "20%" }} key={index}>
              <InputLabel>Article</InputLabel>
              <Select
                label="Article"
                onChange={(event) => handleChangeArticle(index, event, state)}
                value={detail?.article.id}
              >
                {props?.articles?.map((article, index) => (
                  <MenuItem key={index + 1} value={article.id}>
                    {article.designation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantité"
              onChange={(event) => handleChangeQte(index, event, state)}
              value={detail.qte}
            />

            {props.withPu ? (
              <TextField
                label="prix unitaire"
                onChange={(event) => handleChangePu(index, event, state)}
                value={detail.pu as number}
              />
            ) : (
              <></>
            )}
            <Button
              variant="outlined"
              onClick={() => handleDeleteElement(index)}
            >
              Supprimer
            </Button>
          </>
        </div>
      ))}
      <Button variant="outlined" onClick={handleAddElement}>
        Ajouter un element
      </Button>
    </div>
  );
};

export default DetailsArticleQte;

interface DetailsArticleQteState {
  form: {
    details: DetailsArticleQteType[];
  };
}

const initialState: DetailsArticleQteState = {
  form: {
    details: [],
  },
};

export interface DetailsArticleQteType {
  article: { id: number };
  qte: number;
  pu?: number;
  puHt?: number;
  puTTC?: number;
}

interface DetailsArticleQteProps {
  articles: Article[];
  withPu?: boolean;
  details?: DetailsArticleQteType[];
  onDataChange: (data: DetailsArticleQteType[]) => void;
}
