import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useHistory, useParams, Link  } from 'react-router-dom';
import { useEffect } from 'react';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import NewBox from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@material-ui/data-grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const priorityOptions =[
  {
    value: 'Low',
    label: 'Low'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'High',
    label: 'High'
  }
]

const statusStage =[
  {
    value: 'Todo',
    label: 'To do'
  },
  {
    value: 'InProgress',
    label: 'In Progress'
  },
  {
    value: 'Reviewing',
    label: 'Reviewing'
  },
  {
    value: 'Done',
    label: 'Done'
  }

]

const allFunctions = [
  'AA',
  'APEX',
  'APM',
  'BOM',
  'CDBA',
  'CS',
  'DP',
  'FAE',
  'Finance',
  'GTC',
  'Logistics',
  'MI',
  'MM', 
  'OCR',
  'Price&Quotation',
  'Sales',
  'SPM'
];

const regions = [
  {
    value: 'APAC',
    label: 'APAC'
  },
  {
    value: 'Asia',
    label: 'Asia'
  },
  {
    value: 'AU',
    label: 'AU'
  },
  {
    value: 'CN',
    label: 'CN'
  },
  {
    value: 'Global',
    label: 'Global'
  },
  {
    value: 'Japan',
    label: 'Japan'
  },
  {
    value: 'South',
    label: 'South'
  },
  {
    value: 'South+AU',
    label: 'South+AU'
  },
  {
    value: 'TW',
    label: 'TW'
  },
  {
    value: 'Others',
    label: 'Others'
  }
];

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
      field: 'title',
      headerName: 'Title',
      width: 300,
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
      field: 'status',
      headerName: 'Status',
      sortable: true,
      width: 120,
      editable: false,
    }
  ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TaskDetails(props){

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const history =useHistory();
    const[errorMsg, setErrorMsg] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [openDelete, setOpenDelete] = useState(false);
    const [tickets, setTickets] =useState(null);
    const [pageAccessTime, setPageAccessTime] = useState();
    const [openErrorMsg, setErrorMsgOpen] = useState(false);
    const { token } = useToken();

    if(!token)
    {
      history.push('/login');
      window.location.reload();
    }

    var user =jwtDecode(token);
  
    const handleChange = (event) => {
      event.preventDefault();
      setTask({
        ...task,
        [event.target.name]: event.target.value
      });
    };
  
    const handleDelete = () =>{
      fetch(`${process.env.REACT_APP_API_URL}Tasks/`+ id, {
              method:'DELETE',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'bearer '+ token,
              }           
          }).then(res => {
              if(!res.ok)
              {
                res.text().then(text => {setErrorMsg(text)})
                setOpenDelete(false);
              }else
              {             
                history.push('/tasks/updated');
              }
          }).catch(err => {
            setErrorMsg(err.message);
        })
    }


    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleErrorMsgClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setErrorMsgOpen(false);
    };

    const handleClickDelete = () => {
        setOpenDelete(true);
      };
      const handleDeleteClose = () => {
        setOpenDelete(false);
      };

    const handleSubmit = (e) => {
      e.preventDefault();
  
          fetch(`${process.env.REACT_APP_API_URL}Tasks/`+ id + `/` + pageAccessTime, {
              method:'PUT',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'bearer '+ token,
              },
              body: JSON.stringify(task)
          }).then(res => {
              if(!res.ok)
              {
                res.text().then(text => {setErrorMsg(text)})
                setErrorMsgOpen(true)
              }else
              {
                history.push('/tasks/updated');
              }
          }).catch(err => {
            setErrorMsg(err.message);
        })
    }
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}Tasks/`+ id,{
          method: 'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          },
  
      })
          .then(res =>{
               if(!res.ok){
                  throw Error('Could not fetch the data');
               }else{
                return res.json();
               }
          })
          .then(data =>{
              setTask(data);            
              setIsPending(false);
              const funcArray = data.functions.split(",")
              setFunctions(funcArray);
              var now = new Date();
              var timeNow = now.toISOString();
              setPageAccessTime(timeNow);
          })
          .catch(err => {
              setErrorMsg(err.message);
          })
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tickets/task/`+ id,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'bearer '+ token,
        },

    })
        .then(res =>{
             if(!res.ok){
                throw Error('Could not fetch the data');
             }else{
              return res.json();
             }
        })
        .then(data =>{
            setTickets(data);            
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
}, []);

  const theme = useTheme();
  const [selectedFunctions, setFunctions] = React.useState([]);

  const handleFunctionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFunctions(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    task.functions = value.toString();
  };
   
    return (
      <Container component="main" maxWidth="md">
      <form onSubmit={handleSubmit} 
        autoComplete="off"
        {...props}
      >
        <Card>
          <CardHeader
            title="Task Details"
          />
          <Divider />
          {isPending && <div style={{ height: 200, width: '100%'}}><h3>Loading...</h3></div>}
          {task&&<CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Task Name"
                  name="taskName"
                  onChange={handleChange}
                  required
                  value={task.taskName}
                  variant="outlined"
                  inputProps={{ maxLength: 80 }}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Region"
                  name="region"              
                  onChange={handleChange}
                  required
                  value={task.region}
                  variant="outlined"
                  select
                  SelectProps={{ native: true }}
                >{regions.map((option) => (               
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.value}
                  </option>
                ))}

                </TextField>
              </Grid> 
              <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="priority"
                    label="Priority"
                    name="priority"
                    value ={task.priority}
                    select
                    required
                    SelectProps={{ native: true }}
                    onChange = {handleChange}
                >{priorityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}</TextField>   
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="status"
                    label="Status"
                    name="status"
                    value ={task.status}
                    select
                    required
                    SelectProps={{ native: true }}
                    onChange = {handleChange}
                >{statusStage.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}</TextField>   
                </Grid>                       
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Reference Number"
                  name="referenceNumber"
                  onChange={handleChange}
                  value={task.referenceNumber}
                  variant="outlined"
                  inputProps={{ maxLength: 50 }}
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Summary"
                  name="summary"
                  onChange={handleChange}
                  required
                  value={task.summary}
                  variant="outlined"
                  inputProps={{ maxLength: 255 }}
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                  <FormControl sx={{ m: 0, width: 430 }}>
                  <InputLabel id="functions">Functions</InputLabel>
                  <Select
                    labelId="functions"
                    id="functions"
                    multiple
                    value={selectedFunctions}
                    onChange={handleFunctionsChange}
                    input={<OutlinedInput id="select-multiple-functions" label="Chip" />}
                    renderValue={(selected) => (
                      <NewBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </NewBox>
                    )}
                    MenuProps={MenuProps}
                  >
                    {allFunctions.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedFunctions, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Creator"
                  name="creator"
                  onChange={handleChange}
                  value={task.creator}
                  variant="outlined"
                  disabled
                >
                </TextField>
              </Grid>
            </Grid>
            <CardHeader
            title="Attached Tickets"
              />                        
          </CardContent>}
          <div style={{ height: 400, width: '100%' }}>
              {tickets && <DataGrid

              rows={tickets}
              columns={columns}
              pageSize={5}
              
            />}
          </div>
          <Divider />         
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          > <Button
              color="Secondary"
              variant="contained"
              href={"/Tickets/Create/" +id}                
            >
          Create
        </Button>                   
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={user.CanCreateTask==='N'}               
            >
              Save
            </Button>
            <Button
              color="#ffffff"
              variant="contained"
              onClick={handleClickDelete}
            >
              Delete
            </Button>
          </Box>
        </Card>
      </form>
      <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Warning"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wanna delete this task? It will affect the tickets which refer to this task(Only SA leader can delete tasks)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
            color="primary"
            variant="contained"
            disabled={!(user.EmployeeId === "041086"||user.EmployeeId === "043138")}
            onClick={handleDelete}>Delete</Button>
            <Button
            color="#ffffff"
            variant="contained"
            onClick={handleDeleteClose}>Cancel</Button>
          </DialogActions>
      </Dialog>
      <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleErrorMsgClose}>
        <Alert onClose={handleErrorMsgClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
      </Container>
    );
  };