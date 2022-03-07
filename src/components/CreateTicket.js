import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useToken from './useToken';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const types = [
    // {
    //   value: 'RPA',
    //   label: 'RPA'
    // },
    {
      value: 'Project',
      label: 'Project'
    },
    {
      value: 'SR',
      label: 'SR'
    },
    {
      value: 'SSR',
      label: 'SSR'
    },
    {
      value: 'Incident',
      label: 'Incident'
    },
    {
      value: 'CYSpecialApproval',
      label: 'CYSpecialApproval'
    }
  ];


export default function CreateTicket(){
    const classes = useStyles();
    const[title,  setTitle] = useState('');
    const[type,  setType] = useState('Project');
    const[description,  setDescription] = useState('');
    const[assignee, setAssignee] = useState('');
    const[developer, setDeveloper] = useState('');
    const[secondaryDeveloper, setSecondaryDeveloper] = useState('');
    const[businessReview, setBusinessReview] = useState(true);
    const[IsRPA, setIsRPA] = useState(true);
    const[isPending, setIsPending] = useState(false);
    const history =useHistory();
    const { token, setToken } = useToken();
    const[errorMsg, setErrorMsg] = useState(null);
    const[users, setUsers] = useState();
    const[tasks, setTasks] = useState();
    const { id } = useParams();
    const[taskId, setTaskId] = useState();

    
    const handleSubmit =(e) => {
        e.preventDefault();
        const ticket = {title, type, assignee,'status':'unassign' , developer, secondaryDeveloper, description, IsRPA, businessReview, taskId };
       

        setIsPending(true);
        fetch(`${process.env.REACT_APP_API_URL}Tickets`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          },
            body: JSON.stringify(ticket)
        }).then(res => {
          if(!res.ok)
          {
            setIsPending(false);
            throw Error('Woops! Something goes wrong. Make sure your ticket name is not duplicated');
          }else{
            setIsPending(false);
            history.push('/tickets/updated');
          }
        }).catch(err => {
          setErrorMsg(err.message);
      })
    }

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}Users/`,{
          method: 'GET',
          withCredentials: true,
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
              setUsers(data);              
          })
          .catch(err => {
              setErrorMsg(err.message);
          })
    }, []);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}Tasks/`,{
          method: 'GET',
          withCredentials: true,
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
              setTasks(data);
          })
          .catch(err => {
              setErrorMsg(err.message);
          })
    }, []);

    useEffect(() => {     
      if(id)
      {
        setTaskId(id);
      }
    })

    return(
      <Container component="main" maxWidth="sm">
        {users&&<div className = "Create">
            <h1>Create a ticket</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      {tasks&&<TextField
                        fullWidth
                        label="Task"
                        name="id"
                        onChange={(e) => setTaskId(e.target.value)}                  
                        value={taskId}
                        variant="outlined"
                        select
                        required
                        SelectProps={{ native: true }}
                      ><option></option>
                      {tasks.map((option) => (                
                        <option
                          key={option.id}
                          value={option.id}
                        >
                          {option.taskName}
                        </option>
                      ))}
                    </TextField>}
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="TicketName"
                        variant="outlined"
                        required
                        fullWidth
                        id="ticketTitle"
                        label="Ticket Name"
                        value ={title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      select
                      required
                      fullWidth                  
                      id="TicketType"
                      label="Type"
                      name="type"
                      SelectProps={{ native: true }}
                      value ={type}
                      onChange = {(e) => setType(e.target.value)}
                  >
                  {types.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                  </TextField>
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="assignee"
                      label="Assignee(Responsible)"
                      id="assignee"
                      value={assignee}
                      onChange = {(e) => setAssignee(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                  ><option></option>
                  {users.map((option) => (
                    <option
                      key={option.employeeId}
                      value={option.employeeId}
                    >
                      {option.name}
                    </option>
                  ))}
                  </TextField>
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="developer"
                      label="Developer"
                      id="developer"
                      value={developer}
                      onChange = {(e) => setDeveloper(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                  ><option></option>
                  {users.map((option) => (                    
                    <option
                    key={option.employeeId}
                    value={option.employeeId}
                  >
                    {option.name}
                  </option>))}
                  </TextField>
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                      variant="outlined"
                      fullWidth
                      name="secondaryDeveloper"
                      label="Secondary Developer"
                      id="secondaryDeveloper"
                      value={secondaryDeveloper}
                      onChange = {(e) => setSecondaryDeveloper(e.target.value)}
                      select
                      SelectProps={{ native: true }}
                  ><option></option>
                  {users.map((option) => (                    
                    <option
                    key={option.employeeId}
                    value={option.employeeId}
                  >
                    {option.name}
                  </option>))}
                  </TextField>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      multiline
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="Description"
                      value ={description}
                      onChange = {(e) => setDescription(e.target.value)}
                  />
                  </Grid>
{/*                   <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox value={businessReview} color="primary" />}
                      label="Business review required"
                      onChange = {(e) =>setBusinessReview(e.target.checked)}
                  />
                  </Grid> 
                  <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox value= {IsRPA} color="primary" />}
                      label="RPA or DB changes required"
                      onChange = {(e) =>setIsRPA(e.target.checked)}
                  />
                  </Grid> */}
                </Grid>
            {!isPending && <Button
                type="submit"               
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Create
            </Button>}
            {isPending && <Button
                disabled
                type="submit"               
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Creating ticket...
            </Button>}
            <div className="Warning-text">{errorMsg}</div>
            </form>
        </div>}
        </Container>
    );
}