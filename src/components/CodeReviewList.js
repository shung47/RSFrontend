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
        display:'grid',
        marginLeft:10
    },
    singleQuestion: {
        marginLeft:5
    },
    submitBtn:{
        marginTop:10,
        maxWidth:100
    }
  }));

  export default function CodeReivewList({handleCodeReviewListCallback, reviewType}) {

    const classes = useStyles();
     const [state, setState] = React.useState({
        vba_a: false,
        a1: false,
        a2: false,
        a3: false,
        a4: false,
        a5: false,
        a6: false,
        a7: false,
        a8: false,
        a9: false,
        a10: false,
        a11: false,
        a12: false,
        a13: false,
        a14: false,
        a15: false,
        sql_b: false,
        b1: false,
        b2: false,
        b3: false,
        b4: false,
        b5: false,
        b6: false,
        b7: false,
        b8: false,
        b9: false,
        b10: false,
        b11: false,
        b12: false,
        sql_c: false,
        c1: false,
        c2: false,
        c3: false,
        c4: false,
        c5: false,
        c6: false,
        c7: false,
        c8: false,
        c9: false,
        c10: false,
        c11: false,
        rpa_d: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false,
        d7: false,
        d8: false,
        d9: false,
        d10: false,
        d11: false,
        d12: false,
        d13: false,
        d14: false,
        d15: false,
        d16: false,
        d17: false,
        d18: false 
    }); 
    const { token } = useToken();
    const { id } = useParams();
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    const {vba_a,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,sql_b,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,sql_c,c1,c2,c3,c4,c5,rpa_d,d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17,d18 } = state;
    
    useEffect(() => {
        getCodeReviewList();
      }, []);

    function getCodeReviewList(){
        fetch(`${process.env.REACT_APP_API_URL}Tickets/CodeReviewList/`+ id +'/'+reviewType,{
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

        if(!state.vba_a&&!state.sql_b&&!state.sql_c&&!state.rpa_d)
        {
            setErrorMsg('Cannot submit the empty list')
            return
        }
            if(state.vba_a)
            {
                if(!(state.a1&&state.a2&&state.a3&&state.a4&&state.a5&&state.a6&&state.a7&&state.a8&&state.a9&&state.a10&&state.a11&&state.a12&&state.a13&&state.a14&&state.a15))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.sql_b)
            {
                if(!(state.b1&&state.b2&&state.b3&&state.b4&&state.b5&&state.b6&&state.b7&&state.b8&&state.b9&&state.b10&&state.b11&&state.b12))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.sql_c)
            {
                if(!(state.c1&&state.c2&&state.c3&&state.c4&&state.c5))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.rpa_d)
            {
                if(!(state.d1&&state.d2&&state.d3&&state.d4&&state.d5&&state.d6&&state.d7&&state.d8&&state.d9&&state.d10&&state.d11&&state.d12&&state.d13&&state.d14&&state.d15&&state.d16&&state.d17&&state.d18))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            
          fetch(`${process.env.REACT_APP_API_URL}Tickets/CodeReviewList/`+ id +'/'+ reviewType, {
                 method:'POST',
                 headers:{
                     'Content-Type':'application/json',
                     'Authorization':'bearer '+ token,
                 },
                 body: JSON.stringify(state)           
             }).then(res=>{
               if(res.ok)
               {
                getCodeReviewList();
                handleCodeReviewListCallback(true);
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
                        control={<Checkbox checked={vba_a} onChange={handleChange} name="vba_a" />}
                        label="VBA "
                    />
                </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={a1} onChange={handleChange} name="a1" />}
                            label="The code works per its intended function. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a2} onChange={handleChange} name="a2" />}
                            label="Variables are explicitly declared. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a3} onChange={handleChange} name="a3" />}
                            label="Variables are correctly named. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a4} onChange={handleChange} name="a4" />}
                            label="Variables data type are correctly set and proper prefix are used. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a5} onChange={handleChange} name="a5" />}
                            label="Coding convention (left margin) is followed.   "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a6} onChange={handleChange} name="a6" />}
                            label="Global Constants are defined in single unique module "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a7} onChange={handleChange} name="a7" />}
                            label="Functions are arranged well and correctly named according to the return variable type.  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a8} onChange={handleChange} name="a8" />}
                            label="For loops: iterative variable after Next   "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a9} onChange={handleChange} name="a9" />}
                            label="With… End With blocks are correctly used "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a10} onChange={handleChange} name="a10" />}
                            label="Version Control and Report Usage are implemented  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a11} onChange={handleChange} name="a11" />}
                            label="Modules are named meaningfully "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a12} onChange={handleChange} name="a12" />}
                            label="The VBA project is password protected "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a13} onChange={handleChange} name="a13" />}
                            label="Hard codes (if any) are added with comment "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a14} onChange={handleChange} name="a14" />}
                            label="Comments are added reasonably "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={a15} onChange={handleChange} name="a15" />}
                            label="No malicious code found. "
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
                        control={<Checkbox checked={sql_b} onChange={handleChange} name="sql_b" />}
                        label="Stored Procedure and Functions "
                    />
                </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={b1} onChange={handleChange} name="b1" />}
                            label="Use latest SP Framework "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b2} onChange={handleChange} name="b2" />}
                            label="Correct header "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b3} onChange={handleChange} name="b3" />}
                            label="Giving understandable and meaningful names to your variables, functions, stored procedures  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b4} onChange={handleChange} name="b4" />}
                            label="Correct prefix and format "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b5} onChange={handleChange} name="b5" />}
                            label="Add concise comments and make sure comments and code are in sync with each other  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b6} onChange={handleChange} name="b6" />}
                            label="Use proper indentation for the statements "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b7} onChange={handleChange} name="b7" />}
                            label="Avoid SELECT * operation and use explicit column list as far as possible  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b8} onChange={handleChange} name="b8" />}
                            label="Have less rows in your working result set by adding filter criteria "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b9} onChange={handleChange} name="b9" />}
                            label="Avoid using SubQuery "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b10} onChange={handleChange} name="b10" />}
                            label="Do not drop and create tables inside stored procedures "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b11} onChange={handleChange} name="b11" />}
                            label="Use DELETE FROM instead of TRUNCATE TABLE  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={b12} onChange={handleChange} name="b12" />}
                            label="Proper formatting "
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
                        control={<Checkbox checked={sql_c} onChange={handleChange} name="sql_c" />}
                        label="Tables and Views"
                    />
                </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={c1} onChange={handleChange} name="c1" />}
                            label="Correct Data Type is chosen "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={c2} onChange={handleChange} name="c2" />}
                            label="Field length not too large "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={c3} onChange={handleChange} name="c3" />}
                            label="Giving understandable and meaningful names to your tables and views "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={c4} onChange={handleChange} name="c4" />}
                            label="Correct prefix and format "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={c5} onChange={handleChange} name="c5" />}
                            label="Field names have no unnecessary special characters "
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
                        control={<Checkbox checked={rpa_d} onChange={handleChange} name="rpa_d" />}
                        label="RPA "
                    />
                </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <FormControlLabel
                            control={<Checkbox checked={d1} onChange={handleChange} name="d1" />}
                            label="The code works per its intended function. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d2} onChange={handleChange} name="d2" />}
                            label="Variables are correctly named.  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d3} onChange={handleChange} name="d3" />}
                            label="Variables data type are correctly set and proper prefix are used. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d4} onChange={handleChange} name="d4" />}
                            label="Coding convention (left margin) / Top down flow is followed.   "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d5} onChange={handleChange} name="d5" />}
                            label="Codes are aligning with latest library content. (refer to RPA Documentation CDBALibrary Change Log)    "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d6} onChange={handleChange} name="d6" />}
                            label="Sequences/ Activity Blocks are properly named.  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d7} onChange={handleChange} name="d7" />}
                            label="Using Dispatcher Framework  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d8} onChange={handleChange} name="d8" />}
                            label="No hard code. (if hard code is necessary, please put a remark)   "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d9} onChange={handleChange} name="d9" />}
                            label="Incomplete/reserved codes are remarked or removed.  "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d10} onChange={handleChange} name="d10" />}
                            label="Use of function of third-party libraries (such as Stored Proc, Excel Macro) are properly documented. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d11} onChange={handleChange} name="d11" />}
                            label="Comments are put correctly and easily understood. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d12} onChange={handleChange} name="d12" />}
                            label="Logs are correctly placed "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d13} onChange={handleChange} name="d13" />}
                            label="No unnecessary redundant or duplicate code. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d14} onChange={handleChange} name="d14" />}
                            label="Possible errors are handled properly. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d15} onChange={handleChange} name="d15" />}
                            label="Retry mechanism is implemented. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d16} onChange={handleChange} name="d16" />}
                            label="Loops are correctly set with termination conditions. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d17} onChange={handleChange} name="d17" />}
                            label="All credentials are from Orchestrator. No direct input by code. "
                        />
                        <FormControlLabel
                            control={<Checkbox checked={d18} onChange={handleChange} name="d18" />}
                            label="No malicious code found. "
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