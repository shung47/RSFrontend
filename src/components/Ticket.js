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
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react';

const approval = [
  {
    value: 'reviewing',
    label: 'Reviewing'
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
  {
    value: 'RPA',
    label: 'RPA'
  },
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

const TicketDetails = (props) => {
  //const [values, setValues] = useState();

  const handleChange = (event) => {
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value
    });
  };
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch('https://localhost:5001/api/Tickets/'+ id,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
        },

    })
        .then(res =>{
            console.log(res);
            // if(!res.ok){
            //     throw Error('Could not fetch the data');
            // }
            return res.json();
        })
        .then(data =>{
            console.log(data);
            setTicket(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}, []);

  return (
    <Container component="main" maxWidth="md">
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Ticket Details"
        />
        <Divider />
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
                value={ticket[0].title}
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
                value={ticket[0].type}
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
                value={ticket[0].description}
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
                disabled
                onChange={handleChange}
                value={ticket[0].status}
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
                label="Reviewer"
                name="reviewer"
                onChange={handleChange}
                required
                //value={}
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
                label="Approval"
                name="approval"
                onChange={handleChange}
                required
                select
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
          >
            Approve
          </Button>
          <Button
            color="secondary"
            variant="contained"
          >
            Reject
          </Button>
          <Button
            color="default"
            variant="contained"
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
