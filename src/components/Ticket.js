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


const approval = [
  {
    value: 'pending',
    label: 'Pending'
  },
  {
    value: 'approve',
    label: 'Approve'
  },
  {
    value: 'reject',
    label: 'Reject'
  }
];

const types = [
  // {
  //   value: 'RPA',
  //   label: 'RPA'
  // },
  {
    value: 'project',
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
  value: 'progressing',
  label: 'Progressing'
},
{
  value: 'reviewing',
  label: 'Reviewing'
},
{
  value: 'completed',
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
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const history =useHistory();
  const[errorMsg, setErrorMsg] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

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
              throw Error('Cannot update the tickect detail')
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
            setTicket(data[0]);
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
                label="Description"
                name="description"
                onChange={handleChange}
                required
                value={ticket.description}
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
                onChange={handleChange}
                required
                select
                disabled = {user.Role!='SA'&&user.Role!='SALeader'&&user.Role!='Admin'}
                SelectProps={{ native: true }}
                value={ticket.codeApproval}
                variant="outlined"
              >
                {approval.map((option) => (
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
                onChange={handleChange}
                required
                select
                disabled = {user.Role!='SALeader'}
                SelectProps={{ native: true }}
                //value={values.state}
                variant="outlined"
              >
                {approval.map((option) => (
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
                name="BApproval"
                onChange={handleChange}
                required
                select
                disabled={user.Role!='BA'&&user.Role!='BALeader'}
                SelectProps={{ native: true }}
                //value={values.state}
                variant="outlined"
              >
                {approval.map((option) => (
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
                label="Director Approval"
                name="Director pproval"
                onChange={handleChange}
                required
                select
                disabled={user.Role!="Director"}
                SelectProps={{ native: true }}
                //value={values.state}
                variant="outlined"
              >
                {approval.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
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
          >
            Delete
          </Button>
        </Box>
      </Card>
    </form>
    </Container>
  );
};

export default TicketDetails;
