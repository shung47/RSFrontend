import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import useToken from './useToken';


// const rows = [
//   { id: 1, description: 'Snow', title: 'Jon', type: 35 },
//   { id: 2, description: 'Lannister', title: 'Cersei', type: 42 },
//   { id: 3, description: 'Lannister', title: 'Jaime', type: 45 },
//   { id: 4, description: 'Stark', title: 'Arya', type: 16 },
//   { id: 5, description: 'Targaryen', title: 'Daenerys', type: null },
//   { id: 6, description: 'Melisandre', title: null, type: 150 },
// ];

export default function Tasks() {
    const [tasks, setTasks] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token, setToken } = useToken();

    useEffect(() => {
    fetch('https://localhost:5001/api/Tasks',{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'bearer '+ token,
      },

    })
        .then(res =>{
            console.log(res);
            if(!res.ok){
                throw Error('Could not fetch the data');
            }
            setIsPending(false);
            return res.json();
        })
        .then(data =>{          
              setTasks(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);
const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'summary',
      headerName: 'Summary',
      width: 200,
      editable: false,
    },
    {
      field: 'region',
      headerName: 'Region',
      width: 110,
      editable: false,
    },
    {
      field: 'department',
      headerName: 'Department',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'referenceNumber',
      headerName: 'Reference Number',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'edit',
      headerName: ' ',
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href='/Tasks/Edit/'+ cellValues.id;
            }}
          >
            View
          </Button>
        );
      }
    },
  ];


  return (   
      <div>        
      
        <div style={{ height: 600, width: '80%', position:'center',margin: '0 auto' }}>
            {isPending && <div>Loading...</div>}
            {tasks && <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}           
        />}
        </div>
        <div>
        <Button variant="contained" color="primary" href='Tasks/Create'>Create</Button>
        </div>
    </div>
  );
}