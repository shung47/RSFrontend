import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SettingsOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useToken from './useToken';

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
    }
  ];


function CreateTicket(){
    const classes = useStyles();
    const[title,  setTitle] = useState('');
    const[type,  setType] = useState('Project');
    const[description,  setDescription] = useState('');
    const[assignee, setAssignee] = useState('');
    const[developer, setDeveloper] = useState('');
    const[businessReview, setBusinessReview] = useState(false);
    const[IsRPA, setIsRPA] = useState(false);
    const[isPending, setIsPending] = useState(false);
    const history =useHistory();
    const { token, setToken } = useToken();
    const[errorMsg, setErrorMsg] = useState(null);
    
    const handleSubmit =(e) => {
        e.preventDefault();
        const ticket = {title, type, assignee,'status':'unassign' , developer, description, IsRPA, businessReview };
       

        setIsPending(true);
        fetch('https://localhost:5001/api/Tickets', {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          },
            body: JSON.stringify(ticket)
        }).then(res => {
          if(!res.ok)
          {
            throw Error('Woops! Something goes wrong.');
          }else{
            setIsPending(false);
            history.push('/tickets/updated');
          }
        }).catch(err => {
          setErrorMsg(err.message);
      })
    }

    return(
        <Container component="main" maxWidth="sm">
        <div className = "Create">
            <h1>Create a ticket</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={10} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="ticketTitle"
                    label="Title"
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
                    label="Assignee"
                    id="assignee"
                    value={assignee}
                    onChange = {(e) => setAssignee(e.target.value)}
                    //select
                />
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
                    //select
                />
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
                <Grid item xs={6} className="CheckBox">
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
                </Grid>
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
        </div>
        </Container>
    );
}

export default CreateTicket;