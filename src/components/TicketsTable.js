import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import useToken from './useToken';

export default function DataTable(props) {
    const [tickets, setTickets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token, setToken } = useToken();

    useEffect(() => {
    fetch('https://localhost:5001/api/Tickets',{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'bearer '+ token,
      },

    })
        .then(res =>{
            console.log(res);
            // if(!res.ok){
            //     throw Error('Could not fetch the data');
            // }
            return res.json();
        })
        .then(data =>{
            console.log(data);
            if(props.status=='Completed')
            {
              setTickets(data.filter(e=>e.status==='Completed'));
            }else if(props.status=='Reviewing')
            {
              setTickets(data.filter(e=>e.status=='Reviewing'));
            }else 
            {
              setTickets(data.filter(e=>e.status=='OnHold'||e.status=='UnderDevelopment'));
            }
            setIsPending(false);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);
const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'developer',
      headerName: 'Developer',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'primaryCodeReviewer',
      headerName: 'Primary Code Reviewer',
      sortable: true,
      width: 250,
      editable: false,
    },
    {
      field: 'businessReviewer',
      headerName: 'Business Reviewer',
      sortable: true,
      width: 200,
      editable: false,
    },
    {
      field: 'createdDateTime',
      headerName: 'Created Time',
      sortable: true,
      width: 200,
      editable: false,
    },
    {
      field: 'completedDateTime',
      headerName: 'Completed Time',
      sortable: true,
      width: 200,
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
              window.location.href='/Tickets/Edit/'+ cellValues.id;
            }}
          >
            View
          </Button>
        );
      }
    },
  ];


  return (
    <div style={{ height: 400, width: '100%' }}>
        {isPending && <div>Loading...</div>}
        {tickets && <DataGrid

        rows={tickets}
        columns={columns}
        pageSize={5}
        
      />}
    </div>
  );
}
