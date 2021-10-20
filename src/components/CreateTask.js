import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useToken from './useToken';
import { useEffect } from 'react';

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


function CreateTask(){
    const classes = useStyles();
    const[taskName,  setTaskName] = useState('');
    const[region,  setRegion] = useState('');
    const[summary,  setSummary] = useState('');
    const[department,  setDepartment] = useState('');
    const[referenceNumber, setReferenceNumber] = useState('');
    const[isPending, setIsPending] = useState(false);
    const history =useHistory();
    const { token, setToken } = useToken();
    const[errorMsg, setErrorMsg] = useState(null);
    const[users, setUsers] = useState();
    
    const handleSubmit =(e) => {
        e.preventDefault();
        const task = {taskName, region, summary, department, referenceNumber};
       

        setIsPending(true);
        fetch('https://localhost:5001/api/Tasks', {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          },
            body: JSON.stringify(task)
        }).then(res => {
          if(!res.ok)
          {
            throw Error('Woops! Something goes wrong.');
          }else{
            setIsPending(false);
            history.push('/tasks/updated');
          }
        }).catch(err => {
          setErrorMsg(err.message);
      })
    }


    return(
      <Container component="main" maxWidth="sm">
        <div className = "Create">
            <h1>Create a task</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={10} sm={6}>
                <TextField
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="taskName"
                    label="Name"
                    value ={taskName}
                    onChange = {(e) => setTaskName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth                  
                    id="region"
                    label="Region"
                    name="region"
                    value ={region}
                    onChange = {(e) => setRegion(e.target.value)}
                >               
                </TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="department"
                    label="Department"
                    id="department"
                    value={department}
                    onChange = {(e) => setDepartment(e.target.value)}
                >
                </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="summary"
                    label="Summary"
                    id="summary"
                    multiline
                    value={summary}
                    onChange = {(e) => setSummary(e.target.value)}
                >
                </TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    multiline
                    fullWidth
                    id="referenceNumber"
                    label="ReferenceNumber"
                    name="referenceNumber"
                    value ={referenceNumber}
                    onChange = {(e) => setReferenceNumber(e.target.value)}
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
                Creating task...
            </Button>}
            <div className="Warning-text">{errorMsg}</div>
            </form>
        </div>
        </Container>
    );
}

export default CreateTask;