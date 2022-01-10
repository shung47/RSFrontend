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
    const { token } = useToken();
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
            return res.json();
        })
        .then(data =>{
            if(props.status==='Completed')
            {
              setTickets(data.filter(e=>e.status==='Completed'));
            }else if(props.status==='Reviewing')
            {
              setTickets(data.filter(e=>e.status==='Reviewing'));
            }else if(props.status==='MyTickets')
            {
              setTickets(data.filter(e=>e.assignee===user.EmployeeId||e.developer===user.EmployeeId|| e.secondaryDeveloper === user.EmployeeId));
            }else if(props.status==='ApprovalTickets')
            {
              if(user.EmployeeId==='904218')
              {
                setTickets(data.filter(e=>e.type==='Project'&&e.status==='Reviewing'&&e.directorApproval!=='Approved'))
              }else if(user.EmployeeId==='043138'||user.EmployeeId==='041086')
               {
                setTickets(data.filter(e=>e.status==='Reviewing'&&e.saLeaderApproval!=='Approvel'))
               } 
              setTickets(data.filter(e=>e.status==='Reviewing'&&(e.businessReviewer===user.EmployeeId||e.primaryCodeReviewer===user.EmployeeId||e.secondaryCodeReviewer===user.EmployeeId||e.dbmaster===user.EmployeeId)));
            }
            else 
            {
              setTickets(data.filter(e=>e.status==='OnHold'||e.status==='UnderDevelopment'));
            }
            setIsPending(false);
        })
        .catch(err => {
            console.log(err.message);
        })
},[]);
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
            window.location.href='/Tickets/Edit/'+ cellValues.id;
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
      headerName: 'Task Name',
      width: 150,
      editable: false,
    },
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
    props.status==='MyTickets'&&{
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
      type:'dateTime',
      width: 200,
      editable: false,
    },
    (props.status==='Completed'||props.status==='MyTickets')&&{
      field: 'completedDateTime',
      headerName: 'Completed Time',
      sortable: true,
      width: 200,
      editable: false,
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
