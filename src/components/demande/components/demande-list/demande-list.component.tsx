import { Button, Card, Chip } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  frFR,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../../title/title.component";
import { DemandeStore } from "../../store/demande.store";
import "./demande-list.component.scss";

const DemandeListComponent = () => {
  const renderStatut = (status: number) => {
    if (status == 0) {
      return <Chip label="Ouvert" className="div-success" />;
    } else if (status == 5) {
      return <Chip label="Validé" className="div-success" />;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "reference",
      headerName: "Référence",
      width: 200,
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => `${params.row.reference}`,
      align: "center",
    },
    {
      field: "jour",
      headerName: "Date de demande",
      width: 200,
      sortable: true,
      valueGetter: (params) => `${params.row.jour}`,
    },
    {
      field: "direction",
      headerName: "Direction",
      width: 300,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.direction.nom}`,
    },
    {
      field: "ouvert",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: (params) => renderStatut(params.row.etat),
    },
    {
      field: "details",
      headerName: "Details",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/demandes/${params.row.id}/`}>
          <Button variant="contained">Voir plus</Button>
        </Link>
      ),
    },
  ];

  const demandes = useSelector((state: DemandeStore) => state.demande.demandes);

  return (
    <div className="list-demande">
      <div className="title">
        <Title text="Liste des demandes" />
      </div>
      <div className="table-demande">
        {demandes?.length > 0 ? (
          <Card className="card">
            <DataGrid
              rows={demandes}
              getRowId={(row) => row.id}
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
        ) : (
          "Aucune données"
        )}
      </div>
    </div>
  );
};

export default DemandeListComponent;
