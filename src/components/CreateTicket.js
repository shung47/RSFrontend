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

function CreateTicket(){
    const classes = useStyles();
    return(
        <Container component="main" maxWidth="sm">
        <div className = "Create">
            <h2>Create a ticket</h2>
            <form>
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
                    autoFocus
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
                    autoComplete="Type"
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
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Details"
                    label="Details"
                    type="Details"
                    id="details"
                    autoComplete="Details"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="SA leader approval required"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="CY approval required"
                />
                </Grid>
            </Grid>
            <Button
                type="submit"               
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Create
            </Button>
            </form>
            
        </div>
        </Container>
    );
}

export default CreateTicket;