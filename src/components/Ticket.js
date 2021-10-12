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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const approvals = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Rejected',
    label: 'Rejected'
  }
];

const types = [

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
  }
];

const status = [
{
  value: 'Progressing',
  label: 'Progressing'
},
{
  value: 'Reviewing',
  label: 'Reviewing'
},
{
  value: 'Completed',
  label: 'Completed'
},

]

const TicketDetails = (props) => {
  //const [values, setValues] = useState();
  const { token, setToken } = useToken();
  
  var user =jwtDecode(token);
  const handleChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckboxChange = (e) =>{   
    setTicket({
      ...ticket,    
      [e.target.name]: e.target.checked
    });
  };

  const handleDelete = (e) =>{
    fetch('https://localhost:5001/api/Tickets/'+ id, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer '+ token,
            }           
        }).then(res => {
            if(!res.ok)
            {
              res.text().then(text => {setErrorMsg(text)})
            }else
            {             
              history.push('/tickets/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
      })
  }

  const handleApprovalChange =(e) =>{
    e.preventDefault();
    console.log(e);
    
    const approval ={ApprovalType: e.target.name,ApprovalStatus:e.target.value};

    fetch('https://localhost:5001/api/Tickets/'+ id, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer '+ token,
            },
            body: JSON.stringify(approval)
        }).then(res => {
            if(!res.ok)
            {
              res.text().then(text => {setErrorMsg(text)})
            }else
            {
              setTicket({
                ...ticket,
                [e.target.name] : approval.ApprovalStatus
              });
              setApprovalMsg("The " + e.target.name + " is " + approval.ApprovalStatus );
              console.log('Ticket updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
      })
  }

  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const history =useHistory();
  const[errorMsg, setErrorMsg] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const[businessReview, setBusinessReview] = useState(null);
  const[isRPA, setIsRPA] = useState(null);
  const[approvalMsg, setApprovalMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ticket.isRpa = isRPA;
    ticket.businessReview = businessReview;
        fetch('https://localhost:5001/api/Tickets/'+ id, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer '+ token,
            },
            body: JSON.stringify(ticket)
        }).then(res => {
            if(!res.ok)
            {
              res.text().then(text => {setErrorMsg(text)})
            }else
            {
              console.log('Ticket updated');
              history.push('/tickets/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
      })
  }

  useEffect(() => {
    fetch('https://localhost:5001/api/Tickets/'+ id,{
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
            setTicket(data);            
            setIsRPA(data.isRpa);           
            setBusinessReview(data.businessReview);
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
          subheader={errorMsg}
          title="Ticket Details"
        />
        <Divider />
        {isPending && <div style={{ height: 200, width: '100%'}}><h3>Loading...</h3></div>}
        {ticket&&<CardContent>
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
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={ticket.title}
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
                label="Type"
                name="type"
                select               
                onChange={handleChange}
                required
                value={ticket.type}
                SelectProps={{ native: true }}
                variant="outlined"
              >{types.map((option) => (
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
                label="Status"
                name="status"
                select
                onChange={handleChange}
                value={ticket.status}
                variant="outlined"
                SelectProps={{ native: true }}
              >{status.map((option) => (
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
                label="Assignee"
                name="assignee"
                onChange={handleChange}
                required
                value={ticket.assignee}
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
                label="Developer"
                name="developer"
                onChange={handleChange}
                required
                value={ticket.developer}
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
                label="Code Approval"
                name="codeApproval"
                onChange={(e)=>handleApprovalChange(e)}
                required
                select
                //disabled = {user.Role!='SA'&&user.Role!='SALeader'&&user.Role!='Admin'}
                SelectProps={{ native: true }}
                value={ticket.codeApproval}
                variant="outlined"
              >
                {approvals.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
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
                label="SA Leader Approval"
                name="saLeaderApproval"
                onChange={(e)=>handleApprovalChange(e)}
                value={ticket.saLeaderApproval}
                required
                select
                //disabled = {user.Role!='SALeader'}
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {approvals.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
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
                label="Business Review Approval"
                name="businessApproval"
                onChange={(e)=>handleApprovalChange(e)}
                required
                select
                disabled = {!ticket.businessReview}
                //disabled={user.Role!='BA'&&user.Role!='BALeader'}
                SelectProps={{ native: true }}
                value={ticket.businessApproval}
                variant="outlined"
              >{approvals.map((option) => (
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
                label="Director Approval"
                name="directorApproval"
                onChange={(e)=>handleApprovalChange(e)}
                required
                select
                //disabled={user.Role!="Director"}
                SelectProps={{ native: true }}
                value={ticket.directorApproval}
                variant="outlined"
              >{approvals.map((option) => (
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
                label="For something"
                name="something"
                multiline
                //onChange={handleChange}
                // required
                //value={ticket.developer}
                variant="outlined"
              />
            </Grid>
                <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked={businessReview} color="primary" />}
                      label="Business review required"
                      onChange = {(e) =>setBusinessReview(e.target.checked)}
                  />
                  </Grid>
                  <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked= {isRPA} color="primary" />}
                      label="RPA required"
                      onChange = {(e) =>setIsRPA(e.target.checked)}
                  />
                </Grid>
                <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                onChange={handleChange}
                required
                value={ticket.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item
              md={6}
              xs={12}>
            <div style={{ alignContent:"flex-start", display : "flex" }}>
              <h4>*A project needs to be approved by the director and others</h4>
            </div>
          </Grid>

        </CardContent>}
        <Divider />
        {approvalMsg&&<div style={{ marginTop:"10px", fontSize:20 }}>{approvalMsg}</div>}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button 
          variant="outlined" 
          onClick={handleClickOpen} 
          color ="secondary"
          variant="contained"> 
          Send reminding Email
          </Button>
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
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </form>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wanna delete this ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          color="primary"
          variant="contained"
          onClick={handleDelete}>Delete</Button>
          <Button
          color="#ffffff"
          variant="contained"
          onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send a request email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Need someone to approve your ticket? Please provide the email and we will send out the request email for you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketDetails;
