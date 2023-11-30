import Card from "@mui/material/Card";
import Title from "../../../title/title.component";
import "./demande-details.component.scss";
import { Demande } from "../../../shared/types/demande.type";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  frFR,
} from "@mui/x-data-grid";

const DemandeDetails = (props: any) => {
  const demande: Demande = props.demande;

  const classes = {
    "0": "div-warning",
    "-5": "div-danger",
    "5": "div-success",
  };

  const status = {
    "0": "En attente",
    "-5": "Refusé",
    "5": "Validé",
  };

  const renderStatut = (isOpen: boolean) => {
    return isOpen ? (
      <Chip label="Ouvert" className="div-success" />
    ) : (
      <Chip label="Fermé" className="div-danger" />
    );
  };

  const columns: GridColDef[] = [
    {
      field: "reference",
      headerName: "Référence",
      width: 200,
      sortable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.article.reference}`,
      align: "center",
    },
    {
      field: "designation",
      headerName: "Désignation",
      width: 200,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.article.designation}`,
    },
    {
      field: "categorie",
      headerName: "Catégorie",
      width: 300,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.article.categorie.nom}`,
    },
    {
      field: "quantite",
      type: "number",
      headerName: "Quantité",
      width: 100,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Statut",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={status[params.row.status]}
          className={classes[params.row.status]}
        />
      ),
      align: "center",
    },
  ];

  const test = [
    {
      article: {
        reference: "F1",
        designation: "Feuille",
        categorie: {
          nom: "Fourniture",
        },
      },
      quantite: 50,
      status: 0,
    },
    {
      article: {
        reference: "F2",
        designation: "Cahier",
        categorie: {
          nom: "Fourniture",
        },
      },
      quantite: 50,
      status: -5,
    },
    {
      article: {
        designation: "Feuille",
        reference: "F3",
        categorie: { nom: "Fourniture" },
      },
      quantite: 50,
      status: 5,
    },
  ];

  return (
    <>
      {demande && (
        <div className="demande-details-root">
          <div className="info">
            <Card className="card">
              <List>
                <ListItem className="list-item">
                  {" "}
                  <strong className="info-item-title">Référence:</strong>{" "}
                  <span>{demande.reference}</span>
                </ListItem>
                <ListItem className="list-item">
                  {" "}
                  <strong className="info-item-title">Date:</strong>{" "}
                  <span>{demande.jour}</span>
                </ListItem>
                <ListItem className="list-item">
                  {" "}
                  <strong className="info-item-title">Direction</strong>{" "}
                  <span>{demande.direction.nom}</span>
                </ListItem>
                <ListItem className="list-item">
                  {" "}
                  <strong className="info-item-title">Statut</strong>{" "}
                  <span>{renderStatut(demande.estOuvert)}</span>
                </ListItem>
              </List>
            </Card>
          </div>
          <div className="table">
            <Card className="card">
              <DataGrid
                rows={demande.details}
                getRowId={(row) => row.article.reference}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              />
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default DemandeDetails;
