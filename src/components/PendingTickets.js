import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';
import { makeStyles } from '@material-ui/styles';
import { createTheme, darken, lighten } from '@material-ui/core/styles';

function getThemePaletteMode(palette) {
    return palette.type || palette.mode;
  }
  
  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => {
      const getBackgroundColor = (color) =>
        getThemePaletteMode(theme.palette) === 'dark'
          ? darken(color, 0.6)
          : lighten(color, 0.6);
  
      const getHoverBackgroundColor = (color) =>
        getThemePaletteMode(theme.palette) === 'dark'
          ? darken(color, 0.5)
          : lighten(color, 0.5);
  
      return {
        root: {
          '& .super-app-theme--Pending': {
            backgroundColor: getBackgroundColor(theme.palette.error.main),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
            },
          },
          '& .super-app-theme--Rejected': {
            backgroundColor: getBackgroundColor(theme.palette.warning.main),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
            },
          },
          '& .super-app-theme--Approved': {
            backgroundColor: getBackgroundColor(theme.palette.info.main),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
            },
          },
        },
      };
    },
    { defaultTheme },
  );

export default function Tickets() {
    const [tickets, setTickets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token } = useToken();
    var user =jwtDecode(token);
    const classes = useStyles();

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tickets`,{
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
            setTickets(data.filter(e=>e.status!=='Completed'&&(e.businessReviewer===user.EmployeeId||e.primaryCodeReviewer===user.EmployeeId|| e.secondaryCodeReviewer === user.EmployeeId)));     
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
      <div>        
      
        <div style={{ height: 600, width: '80%', position:'center',margin: '0 auto' }} className={classes.root}>
            {isPending && <div>Loading...</div>}
            {tickets && <DataGrid
            rows={tickets}
            columns={columns}
            pageSize={10}
            getRowClassName={(params) =>
                `super-app-theme--${params.getValue(params.id, 'businessApproval')}`
            }      
        />}
        </div>
    </div>
  );
}
