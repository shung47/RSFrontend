import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useToken from './useToken';
import {Button} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    formControl: {
      margin:5
    },
    label: {
        margin:10
    },
    accordionDetails:{
        display:'block',
        marginLeft:10
    },
    singleQuestion: {
        marginLeft:5
    },
    submitBtn:{
        maxWidth:100
    }
  }));

  export default function BusinessReivewList({handleBusinessReviewListCallback, reviewType}) {

    const classes = useStyles();
     const [state, setState] = React.useState({
        a:false,
        a1: false,
        a2: false,
        b: false,
        b1: false,
        b2: false
    }); 
    const { token } = useToken();
    const { id } = useParams();
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    const {a,a1,a2,b,b1,b2 } = state;
    
    useEffect(() => {
        getBusinessReviewList();
      }, []);

    function getBusinessReviewList(){
        fetch(`${process.env.REACT_APP_API_URL}Tickets/BusinessReviewList/`+ id +'/'+reviewType,{
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
                setState(data);
            })
            .catch(err => {             
            })
      };

    const handleSubmit = (e) =>{
        e.preventDefault();

            if(!state.a||!state.b)
            {
                setErrorMsg('Cannot submit the list. Please make sure you check all the items')
                return
            }

            if(state.a)
            {
                if(!(state.a1&&state.a2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.b)
            {
                if(!(state.b1&&state.b2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            
          fetch(`${process.env.REACT_APP_API_URL}Tickets/BusinessReviewList/`+ id +'/'+reviewType, {
                 method:'POST',
                 headers:{
                     'Content-Type':'application/json',
                     'Authorization':'bearer '+ token,
                 },
                 body: JSON.stringify(state)           
             }).then(res=>{
               if(res.ok)
               {
                getBusinessReviewList();
                handleBusinessReviewListCallback(true);
                setErrorMsg('');
               }
             }
             )
                   
      }

    return(
        <div className= "main">
            <FormGroup className={classes.formControl}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                >
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox checked={a} onChange={handleChange} name="a" />}
                        label="1. Have you excluded MFI? If not, have you confirmed with CY / manager to ensure exception?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={a1} onChange={handleChange} name="a1" />}
                label="I understand that All MFI data needs to be excluded for all reports with detail. No report requires MFI detail. No matter by customer/line/supplier…all dimensions are completely prohibited.  
                Anyone intentionally share or accidentally share the sensitive information to anyone will not be accepted."
                />
                <FormControlLabel
                    control={<Checkbox checked={a2} onChange={handleChange} name="a2" />}
                    label="I remember to set [MFI] = 'N' in my code."
                />
                </AccordionDetails>
            </Accordion>           
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                >
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox checked={b} onChange={handleChange} name="b" />}
                        label="2. Is requestor the authorized party to access the data? If no, please confirm with supervisor / CDBA contact point."
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={b1} onChange={handleChange} name="b1" />}
                label="I confirm that data requestor is getting the data within scope."
                />
                <FormControlLabel
                    control={<Checkbox checked={b2} onChange={handleChange} name="b2" />}
                    label="I confirm that data shared has already be embedded with correct security setup (If any, may be it is a tool with security)."
                />
                </AccordionDetails>
            </Accordion>
            <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submitBtn}
            >
            Submit
            </Button>
            <div className="Warning-text">{errorMsg}</div>
            </FormGroup>        
        </div>
    )
}