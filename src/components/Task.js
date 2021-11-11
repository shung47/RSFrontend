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

export default function TaskDetails(props){
    //const [values, setValues] = useState();
    const { token, setToken } = useToken();
    
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
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickDelete = () => {
        setOpenDelete(true);
      };
      const handleDeleteClose = () => {
        setOpenDelete(false);
      };
    
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
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
          })
          .catch(err => {
              setErrorMsg(err.message);
          })
  }, []);
   
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
                ></TextField>
              </Grid>           
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  onChange={handleChange}
                  value={task.department}
                  variant="outlined"
                ></TextField>
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
              Are you sure you wanna delete this task? It will affect the tickets which refer to this task
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
            color="primary"
            variant="contained"
            disabled={!(user.EmployeeId == "041086"||user.EmployeeId == "043138")}
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