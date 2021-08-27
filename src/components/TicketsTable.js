import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'creater',
    headerName: 'Creater',
    sortable: true,
    width: 150,
    editable: false,
  },
  {
    field: 'createdDatetime',
    headerName: 'Created Datetime',
    sortable: true,
    width: 200,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    width: 120,
    editable: false,
  },
  {
    field: 'edit',
    headerName: ' ',
    sortable: false,
    width: 160,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
           
          }}
        >
          View
        </Button>
      );
    }
  },
];

const rows = [
  { id: 1, description: 'Snow', title: 'Jon', type: 35 },
  { id: 2, description: 'Lannister', title: 'Cersei', type: 42 },
  { id: 3, description: 'Lannister', title: 'Jaime', type: 45 },
  { id: 4, description: 'Stark', title: 'Arya', type: 16 },
  { id: 5, description: 'Targaryen', title: 'Daenerys', type: null },
  { id: 6, description: 'Melisandre', title: null, type: 150 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        
      />
    </div>
  );
}
