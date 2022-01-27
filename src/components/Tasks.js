import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';

export default function Tasks() {
    const [tasks, setTasks] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token } = useToken();
    var user =jwtDecode(token);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tasks`,{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'bearer '+ token,
      },

    })
        .then(res =>{
            if(!res.ok){
                throw Error('Could not fetch the data');
            }
            setIsPending(false);
            return res.json();
        })
        .then(data =>{          
              setTasks(data);
              console.log(user);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);
const columns = [
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
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'taskName',
      headerName: 'Name',
      width: 200,
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
      width: 150,
      editable: false,
    },
    {
      field: 'functions',
      headerName: 'Functions',
      sortable: true,
      width: 250,
      editable: false,
    },
    {
      field: 'creator',
      headerName: 'Creator',
      sortable: true,
      width: 200,
      editable: false,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
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
  ];


  return (   
      <div>        
        <h1>Tasks</h1>
        <div style={{ height: 600, width: '90%', position:'center',margin: '0 auto' }}>
            {isPending && <div>Loading...</div>}
            {tasks && <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}       
        />}
        </div>
        <div>
        <Button 
        variant="contained" 
        color="primary" 
        href='Tasks/Create'
        disabled = {user.CanCreateTask==='N'}
        >Create</Button>
        </div>
    </div>
  );
}
