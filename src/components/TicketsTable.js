import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';

export default function DataTable(props) {
    const [tickets, setTickets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token, setToken } = useToken();
    var user =jwtDecode(token);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tickets`,{
        method: 'GET',
        //mode: 'cors',
        //credentials: 'include',
        headers:{
          'Content-Type':'application/json',          
          'Authorization':'bearer '+ token,
      },

    })
        .then(res =>{
            console.log(res);
            //  if(!res.ok){
            //     throw Error('Could not fetch the data');
            // }
            return res.json();
        })
        .then(data =>{
            if(props.status=='Completed')
            {
              setTickets(data.filter(e=>e.status==='Completed'));
            }else if(props.status=='Reviewing')
            {
              setTickets(data.filter(e=>e.status=='Reviewing'));
            }else if(props.status=='MyTickets')
            {
              setTickets(data.filter(e=>e.assignee===user.EmployeeId||e.primaryCodeReviewer==user.EmployeeId||e.secondaryCodeReviewer==user.EmployeeId||e.businessReviewer==user.EmployeeId||e.developer==user.EmployeeId));
            }
            else 
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
      width: 110,
      editable: false,
    },
    {
      field: 'assigneeName',
      headerName: 'Assignee',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'developerName',
      headerName: 'Developer',
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: 'primaryCodeReviewerName',
      headerName: 'Primary Code Reviewer',
      sortable: true,
      width: 250,
      editable: false,
    },
    {
      field: 'secondaryCodeReviewerName',
      headerName: 'Secondary Code Reviewer',
      sortable: true,
      width: 250,
      editable: false,
    },
    {
      field: 'businessReviewerName',
      headerName: 'Business Reviewer',
      sortable: true,
      width: 200,
      editable: false,
    },
    props.status=='MyTickets'&&{
      field: 'status',
      headerName: 'Status',
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
    props.status=='Completed'||props.status=='MyTickets'&&{
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
    <div style={{ height: 600, width: '100%' }}>
        {isPending && <div>Loading...</div>}
        {tickets && <DataGrid

        rows={tickets}
        columns={columns}
        pageSize={10}
        
      />}
    </div>
  );
}
