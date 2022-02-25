import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {
  return fetch(`${process.env.REACT_APP_API_URL}login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json()
  );

 }

 

export default function Login() {
  const classes = useStyles();
  const[employeeId,  setEmployeeId] = useState();
  const[name, setName] =useState();
  const[password,  setPassword] = useState();
  const[errorMsg, setErrorMsg] = useState(null);
  const[openForgetPw, setOpenForgetPw] = useState(false);

  const handleClickForgetPw = () => {
    setOpenForgetPw(true);
  };
  const handleForgetPwClose = () => {
    setOpenForgetPw(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        try{
          const token = await loginUser({
            name, password
          });
          if(!token)
          {
            setErrorMsg('Incorrect name or password');
          }else{
            setToken(token);
            window.location.replace('/Tickets');
          }
        }catch
        {
          setErrorMsg('Incorrect name or password');
        };

  }

  function sendResetPwEmail(){
    fetch(`${process.env.REACT_APP_API_URL}login/SendEmail/`+ employeeId, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     },
   }).then(res =>{
     if(!res.ok){
        res.text().then(text => {setErrorMsg(text)})
     }else{
       setErrorMsg('Email Sent');
       return res.json();              
     }
     }
   );
   setOpenForgetPw(false);
  }

  function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h4" style = {{marginBottom:"20px", color:'#3f51b5'}}>
          CDBA LOG
      </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Login Name(e.g.,seanlee)"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange = {(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <div className="Warning-text">{errorMsg}</div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleClickForgetPw}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Dialog
        open={openForgetPw}
        onClose={handleForgetPwClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Please input your employee ID here and we will send you an email to reset the password
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="employeeID"
            label="employeeID"
            type="employeeID"
            id="employeeID"
            autoComplete="current-password"
            value={employeeId}
            onChange = {(e) => setEmployeeId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button 
          color="primary"
          variant="contained"
          onClick={sendResetPwEmail}
          >Send</Button>
          <Button
          color="#ffffff"
          variant="contained"
          onClick={handleForgetPwClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
