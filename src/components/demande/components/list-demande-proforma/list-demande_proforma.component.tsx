import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import './list-demande-proforma.component.scss';
const DemandeProforma = () => {
    const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8080/demandes/proforma')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);
      
      const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'reference', headerName: 'Reference', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'fournisseur', headerName: 'Fournisseur', width: 215 },
      ];
  return (
    <div >
        <h1>Liste des demandes proforma</h1>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5, 10]}
        autoHeight
        style={{ width: '50%' }}

      />
    </div>
  );
};

export default DemandeProforma;
