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
import { useHistory, useParams } from 'react-router-dom';
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
import { textAlign } from '@mui/system';

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

const allFunctions = [
  'APEX',
  'MI',
  'FAE',
  'DP',
  'OCR',
  'P&Q',
  'AA',
  'APM',
  'Sales',
  'CS',
  'MM',
  'Finance',
  'BOM',
  'CDBA',
  'GTC'
];

const regions = [
  {
    value: 'TW',
    label: 'TW'
  },
  {
    value: 'CN',
    label: 'CN'
  },
  {
    value: 'South',
    label: 'South'
  },
  {
    value: 'Asia',
    label: 'Asia'
  },
  {
    value: 'APAC',
    label: 'APAC'
  },
  {
    value: 'Japan',
    label: 'Japan'
  },
  {
    value: 'Global',
    label: 'Global'
  },
  {
    value: 'Others',
    label: 'Others'
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
    //const [values, setValues] = useState();
    const { token } = useToken();
    
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
  
  
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const history =useHistory();
    const[errorMsg, setErrorMsg] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickDelete = () => {
        setOpenDelete(true);
      };
      const handleDeleteClose = () => {
        setOpenDelete(false);
      };

    const handleSubmit = (e) => {
      e.preventDefault();
  
          fetch(`${process.env.REACT_APP_API_URL}Tasks/`+ id, {
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
    task.functions = selectedFunctions.toString();
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
                  label="Name"
                  name="taskName"
                  onChange={handleChange}
                  required
                  value={task.taskName}
                  variant="outlined"
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
                {/* <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  onChange={handleChange}
                  value={task.department}
                  variant="outlined"
                ></TextField> */}
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
          </CardContent>}
          <Divider />         
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >         
            <Button
              color="primary"
              variant="contained"
              type="submit"               
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
      </Container>
    );
  };