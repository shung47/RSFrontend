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
  },
  {
    value: 'Incident',
    label: 'Incident'
  }
];

const status = [
{
  value: 'OnHold',
  label: 'On Hold'
},
{
  value: 'UnderDevelopment',
  label: 'Under Development'
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
    event.preventDefault();
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value
    });
  };

  const handleDelete = () =>{
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
              setOpenDelete(false);
              setApprovalMsg(null);
            }else
            {             
              history.push('/tasks/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
          setApprovalMsg(null);
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
              var now = new Date();
              var timeNow = now.toISOString()
              setTicket({
                ...ticket,
                [e.target.name] : approval.ApprovalStatus,
                [e.target.name +'Time']: timeNow
              });
              setApprovalMsg("The " + e.target.name + " is " + approval.ApprovalStatus );
              setErrorMsg(null);
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
  const [openDelete, setOpenDelete] = useState(false);
  const [firstCRwindow, setFirstCRwindow] = useState(false);
  const [secCRwindow, setSecCRwindow] = useState(false);
  const [brWindow, setBrWindow] = useState(false);
  const [users, setUsers] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [dbControlList, setDbControlList]=useState(null);

  const handleFirstClose = () => {
    setFirstCRwindow(false);
  };
  const handleFirstOpen = () => {
    setFirstCRwindow(true);
  };
  const handleSecClose = () => {
    setSecCRwindow(false);
  };
  const handleSecOpen = () => {
    setSecCRwindow(true);
  };
  const handleBrClose = () => {
    setBrWindow(false);
  };
  const handleBrOpen = () => {
    setBrWindow(true);
  };

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
              setApprovalMsg(null);
            }else
            {
              console.log('Ticket updated');
              history.push('/tickets/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
          setApprovalMsg(null);
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
            setDbControlList(data.dbControlList);
            setIsPending(false);
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
}, []);

  useEffect(() => {
    fetch('https://localhost:5001/api/Users/',{
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
            setUsers(data);
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
  }, []);

  useEffect(() => {
    fetch('https://localhost:5001/api/Tasks/',{
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
            setTasks(data);
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
              {tasks&&<TextField
                fullWidth
                label="Task Name"
                name="taskId"
                onChange={handleChange}
                value={ticket.taskId}
                variant="outlined"
                select
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
              {users&&<TextField
                fullWidth
                label="Assignee"
                name="assignee"
                onChange={handleChange}
                required
                value={ticket.assignee}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >{users.map((option) => (
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}
              </TextField>}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {users&&<TextField
                fullWidth
                label="Developer"
                name="developer"
                onChange={handleChange}
                required
                value={ticket.developer}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >
                {users.map((option) => (               
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}</TextField>}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {users&&<TextField
                fullWidth
                label="Secondary Developer"
                name="secondaryDeveloper"
                onChange={handleChange}
                value={ticket.secondaryDeveloper}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              ><option></option>
              {users.map((option) => (
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}</TextField>}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {dbControlList&&<TextField
                fullWidth
                label="Database Modification"
                name="dbmaster"
                onChange={handleChange}
                value={ticket.dbmaster}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              ><option></option>
              {Array.from(dbControlList).map((option) => (
                <option
                  key={option.database + option.saMaster }
                  value={option.saMaster}
                >
                  {option.database} - {option.saMaster}
                </option>
              ))}</TextField>}
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
                required
                value={ticket.creator}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                type="textarea"
                multiline 
                fullWidth
                label="Description"
                name="description"
                onChange={handleChange}
                required
                value={ticket.description}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked={businessReview} color="primary" />}
                      label="Business review required"
                      onChange = {(e) =>setBusinessReview(e.target.checked)}
                      disabled = {ticket.type!="Incident"}
                  />
                  </Grid>
                  <Grid item xs={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked= {isRPA} color="primary" />}
                      label="RPA or DB changes required"
                      onChange = {(e) =>setIsRPA(e.target.checked)}
                  />
                </Grid>
          </Grid>
          {(ticket.status=='Reviewing'||ticket.status=='Completed')&&users&&<Grid
            container
            spacing={3}>
                
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Primary code reviewer"
                name="primaryCodeReviewer"
                onChange={handleChange}
                value={ticket.primaryCodeReviewer}
                variant="outlined"
                select
                //SelectProps={{ native: true }}
              ><option></option>{users.map((option) => (
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}</TextField>
              <div style={{ alignContent:"flex-start", display : "flex" }}>
                <Button 
                    variant="outlined" 
                    onClick={handleFirstOpen} 
                    color ="primary"
                    disabled = {user.Email != ticket.primaryCodeReviewer}
                    variant="contained">                    
                    Approval
                </Button>
                <Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    variant="contained"> 
                    {ticket.primaryCodeApproval} {ticket.primaryCodeApprovalTime}
                </Button>

              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Secondary code reviewer"
                name="secondaryCodeReviewer"
                onChange={handleChange}
                value={ticket.secondaryCodeReviewer}
                variant="outlined"
                select
                //SelectProps={{ native: true, default: ""}}
              >{users.map((option) => (
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}</TextField>
              <div style={{ alignContent:"flex-start", display : "flex" }}>
                <Button 
                    variant="outlined" 
                    onClick={handleSecOpen} 
                    color ="primary"
                    disabled = {user.Email != ticket.secondaryCodeReviewer}
                    variant="contained"> 
                    Approval
                </Button>
                <Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    variant="contained"> 
                    {ticket.secondaryCodeApproval} {ticket.secondaryCodeApprovalTime}
                </Button>
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Business Reviewer"
                name="businessReviewer"
                onChange={handleChange}
                value={ticket.businessReviewer}
                variant="outlined"
                select
                //SelectProps={{ native: true }}
              >{users.map((option) => (
                <option
                  key={option.email}
                  value={option.email}
                >
                  {option.email}
                </option>
              ))}</TextField>
              <div style={{ alignContent:"flex-start", display : "flex" }}>
                <Button 
                    variant="outlined" 
                    onClick={handleBrOpen} 
                    color ="primary"
                    disabled = {user.Email != ticket.businessReviewer}
                    variant="contained"> 
                    
                    Approval
                </Button>
                <Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    variant="contained"> 
                    {ticket.businessApproval} {ticket.businessApprovalTime}
                </Button>
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
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
              <div style={{ alignContent:"flex-start", display : "flex" }}>
                <Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    variant="contained"> 
                    {ticket.saLeaderApprovalTime}
                </Button>
              </div>             
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
              <div style={{ alignContent:"flex-start", display : "flex" }}>
                <Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    variant="contained"> 
                    {ticket.directorApprovalTime}
                </Button>
              </div>               
              </Grid>
                
          </Grid>}
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
        {errorMsg&&<div style={{ marginTop:"10px", fontSize:20 }}>{errorMsg}</div>}
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
          onClick={handleDeleteClose}>Cancel</Button>
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
    {ticket&&<Dialog open={firstCRwindow} onClose={handleFirstClose}>
      <DialogTitle>Primary Code Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is the window you approve the code review
        </DialogContentText>       
      </DialogContent>
      <DialogContent>
        <TextField
            fullWidth
            label="Primary Code Approval"
            name="primaryCodeApproval"
            onChange={(e)=>handleApprovalChange(e)}
            required
            select
            //disabled = {user.Role!='SA'&&user.Role!='SALeader'&&user.Role!='Admin'}
            SelectProps={{ native: true }}
            value={ticket.primaryCodeApproval}
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
        </DialogContent>
          <DialogContentText>
          {errorMsg}
          </DialogContentText>   
      <DialogActions>
        <Button color="primary"  variant="contained" onClick={handleFirstClose}>Ok</Button>
      </DialogActions>
    </Dialog>}
    {ticket&&<Dialog open={secCRwindow} onClose={handleSecClose}>
      <DialogTitle>Secondary Code Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is the window you approve the code review
        </DialogContentText>       
      </DialogContent>
        <DialogContent>
          <TextField
                fullWidth
                label="Secondary Code Approval"
                name="secondaryCodeApproval"
                onChange={(e)=>handleApprovalChange(e)}             
                required
                select
                //disabled = {user.Role!='SA'&&user.Role!='SALeader'&&user.Role!='Admin'}
                SelectProps={{ native: true }}
                value={ticket.secondaryCodeApproval}
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
        </DialogContent>
        <DialogContentText>
          {errorMsg}
        </DialogContentText>   
      <DialogActions>
        <Button color="primary"  variant="contained" onClick={handleSecClose}>Ok</Button>
      </DialogActions>
    </Dialog>}
    {ticket&&<Dialog open={brWindow} onClose={handleBrClose}>
      <DialogTitle>Business Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is the window you approve the business review
        </DialogContentText>       
      </DialogContent>
        <DialogContent>
          <TextField
                fullWidth
                label="BusinessApproval"
                name="businessApproval"
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
          <DialogContentText>
            {errorMsg}
          </DialogContentText>       
        </DialogContent>
      <DialogActions>
        <Button color="primary"  variant="contained" onClick={handleBrClose}>Ok</Button>
      </DialogActions>
    </Dialog>}
    </Container>
  );
};

export default TicketDetails;
