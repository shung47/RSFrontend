import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';
import { useTheme } from '@mui/material/styles';
import NewBox from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const priorityOptions =[
  {
    value: 'Low',
    label: 'Low'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'High',
    label: 'High'
  }
]

const allFunctions = [
  'AA',
  'APEX',
  'APM',
  'Asset Management',
  'BOM',
  'CDBA',
  'CS',
  'DP',
  'FAE',
  'Finance',
  'GTC',
  'Logistics',
  'MI',
  'MM', 
  'OCR',
  'Price&Quotation',
  'Sales',
  'SPM'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

  const regions = [
    {
      value: 'APAC',
      label: 'APAC'
    },
    {
      value: 'Asia',
      label: 'Asia'
    },
    {
      value: 'AU',
      label: 'AU'
    },
    {
      value: 'CN',
      label: 'CN'
    },
    {
      value: 'Global',
      label: 'Global'
    },
    {
      value: 'Japan',
      label: 'Japan'
    },
    {
      value: 'South',
      label: 'South'
    },
    {
      value: 'South+AU',
      label: 'South+AU'
    },
    {
      value: 'TW',
      label: 'TW'
    },
    {
      value: 'Others',
      label: 'Others'
    }
  ];


  export default function CreateTask(){
    const classes = useStyles();
    const[taskName,  setTaskName] = useState('');
    const[region,  setRegion] = useState('');
    const[summary,  setSummary] = useState('');
    const[selectedFunctions,  setFunctions] = useState([]);
    const[referenceNumber, setReferenceNumber] = useState('');
    const[isPending, setIsPending] = useState(false);
    const history =useHistory();
    const { token } = useToken();
    const[errorMsg, setErrorMsg] = useState(null);
    const[priority, setPriority] = useState('Low');
    var user =jwtDecode(token);

    const handleSubmit =(e) => {
        e.preventDefault();
        let functions = selectedFunctions.toString();
        const task = {taskName, region, summary, functions, referenceNumber, priority};
       

        setIsPending(true);
        fetch(`${process.env.REACT_APP_API_URL}Tasks`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          },
            body: JSON.stringify(task)
        }).then(res => {
          if(!res.ok)
          {
            setIsPending(false);
            throw Error('Woops! Something goes wrong. Make sure your task name is not duplicated');           
          }else{
            setIsPending(false);
            history.push('/tasks/updated');
          }
        }).catch(err => {
          setErrorMsg(err.message);
      })
    }

    const theme = useTheme();

  const handleFunctionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFunctions(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
                    label="Task Name"
                    value ={taskName}
                    onChange = {(e) => setTaskName(e.target.value)}
                    inputProps={{ maxLength: 80 }}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    select
                    fullWidth                  
                    id="region"
                    label="Region"
                    name="region"
                    value ={region}
                    SelectProps={{ native: true }}
                    onChange = {(e) => setRegion(e.target.value)}
                ><option></option>{regions.map((option) => (
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
                <FormControl sx={{ m: 0, width: 400 }}>
                  <InputLabel id="functions">Functions</InputLabel>
                  <Select
                    labelId="functions"
                    id="functions"
                    multiple
                    value={selectedFunctions}
                    onChange={handleFunctionsChange}
                    input={<OutlinedInput id="select-multiple-functions" label="Functions" />}
                    renderValue={(selected) => (
                      <NewBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </NewBox>
                    )}
                    MenuProps={MenuProps}
                  >
                    {allFunctions.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, selectedFunctions, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Functions"
                    label="Functions"
                    id="functions"
                    value={functions}
                    onChange = {(e) => setFunctions(e.target.value)}
                >
                </TextField> */}
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
                    inputProps={{ maxLength: 255 }}

                >
                </TextField>
                </Grid>
                <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="priority"
                    label="Priority"
                    name="priority"
                    value ={priority}
                    select
                    required
                    SelectProps={{ native: true }}
                    onChange = {(e) => setPriority(e.target.value)}
                >{priorityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}</TextField>   
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
                    inputProps={{ maxLength: 50 }}
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