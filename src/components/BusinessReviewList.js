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
        display:'block'
    },
    singleQuestion: {
        marginLeft:5
    },
    submitBtn:{
        maxWidth:100
    }
  }));

  export default function BusinessReivewList({handleBusinessReviewListCallback}) {

    const classes = useStyles();
     const [state, setState] = React.useState({
        a: false,
        b:false,
        b1: false,
        b2: false,
        c: false,
        d: false,
        d1: false,
        d2: false,
        e:false,
        e1: false,
        e2: false,
        e3: false,
        e4: false,
        e5: false,
        e6: false,
        f:false,
        f1: false,
        f2: false,
        g: false,
        g1: false,
        g2: false,
        h:false,
        h1: false,
        h2: false,
        h3: false,
        i: false,
        i1: false,
        i2: false,
        i3: false,
        i4: false,
        j: false,
        j1: false,
        j2: false,
        j3: false,
        k: false,
        l: false,
        m: false,
        n: false,
        n1: false,
        n2: false,
        n3: false,
        n4: false,
        o: false,
        p: false,
        q: false,
        r: false,
        r1: false,
        r2: false,
        r3: false,
        r4: false,
        r5: false,
        s: false
    }); 
    const { token } = useToken();
    const { id } = useParams();
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    const {a,b,b1,b2,c,d,d1,d2,e,e1,e2,e3,e4,e5,e6,f,f1,f2,g,g1,g2,h,h1,h2,h3,i,i1,i2,i3,i4,j,j1,j2,j3,k,l,m,n,n1,n2,n3,n4,o,p,q,r,r1,r2,r3,r4,r5,s } = state;
    
    useEffect(() => {
        getBusinessReviewList();
      }, []);

    function getBusinessReviewList(){
        fetch(`${process.env.REACT_APP_API_URL}Tickets/BusinessReviewList/`+ id,{
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

            if(state.b)
            {
                if(!(state.b1&&state.b2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.d)
            {
                if(!(state.d1&&state.d2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.e)
            {
                if(!(state.e1&&state.e2&&state.e3&&state.e4&&state.e5&&state.e6))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.f)
            {
                if(!(state.f1&&state.f2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.g)
            {
                if(!(state.g1&&state.g2))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.h)
            {
                if(!(state.h1&&state.h2&&state.h3))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.i)
            {
                if(!(state.i1&&state.i2&&state.i3&&state.i4))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.j)
            {
                if(!(state.j1&&state.j2&&state.j3))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.n)
            {
                if(!(state.n1&&state.n2&&state.n3&&state.n4))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
            if(state.r)
            {
                if(!(state.r1&&state.r2&&state.r3&&state.r4&&state.r5))
                {
                    setErrorMsg('Cannot submit the list. Make sure you check all the sub items under the parents')
                    return
                }
            }
          fetch(`${process.env.REACT_APP_API_URL}Tickets/BusinessReviewList/`+ id, {
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
            <FormControlLabel className ={classes.singleQuestion}
                control={<Checkbox checked={a} onChange={handleChange} name="a" />}
                label="1. I remember to exclude Region = NA, Excluded, '' (blank)"
            />
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
                        label="2. Have you excluded MFI? If not, have you confirmed with CY / manager to ensure exception?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={b1} onChange={handleChange} name="b1" />}
                label="I understand that All MFI data needs to be excluded for all reports with detail. No report requires MFI detail. No matter by customer/line/supplier…all dimensions are completely prohibited.  
                Anyone intentionally share or accidentally share the sensitive information to anyone will not be accepted."
                />
                <FormControlLabel
                    control={<Checkbox checked={b2} onChange={handleChange} name="b2" />}
                    label="I remember to set [MFI] = 'N' in my code."
                />
                </AccordionDetails>
            </Accordion>
            <FormControlLabel className ={classes.singleQuestion}
                control={<Checkbox checked={c} onChange={handleChange} name="c" />}
                label="3. If involve Group Customer, have you referred to related Guideline?"
            />
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                >
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox checked={d} onChange={handleChange} name="d" />}
                        label="4. Is requestor the authorized party to access the data? If no, please confirm with supervisor / CDBA contact point."
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={d1} onChange={handleChange} name="d1" />}
                label="I confirm that data requestor is getting the data within scope."
                />
                <FormControlLabel
                    control={<Checkbox checked={d2} onChange={handleChange} name="d2" />}
                    label="I confirm that data shared has already be embedded with correct security setup (If any, may be it is a tool with security)."
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
                        control={<Checkbox checked={e} onChange={handleChange} name="e" />}
                        label="5. If involve SO Backlog, have you referred to related?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={e1} onChange={handleChange} name="e1" />}
                label="I understand the meaning of [Flag] and [SO Type]"
                />
                <FormControlLabel
                    control={<Checkbox checked={e2} onChange={handleChange} name="e2" />}
                    label="I understand that from Demand point of view, I should refer to CRD related information.  If I want to see from Shippable point of view (whether a part can be billed at the date stated), I should refer to CSD related information."
                />
                <FormControlLabel
                    control={<Checkbox checked={e3} onChange={handleChange} name="e3" />}
                    label="I understand whether to exclude Avnet Intercompany."
                />
                <FormControlLabel
                    control={<Checkbox checked={e4} onChange={handleChange} name="e4" />}
                    label="I understand that for VMI Demand, the CRD is SO Backlog could have been inflated with Buffer stock, which could be non-Shippable, in reality.  Meaning, in our SAP, CRD qty=Customer real demand + Agreed Buffer Qty."
                />
                <FormControlLabel
                    control={<Checkbox checked={e5} onChange={handleChange} name="e5" />}
                    label="I understand that in  [MRS].[dbo].[tblMappingVMICTMList] , I need to refer to [Start] and [End] dates, Only those fell inside the period,  are those valid VMI customer. "
                />
                <FormControlLabel
                    control={<Checkbox checked={e6} onChange={handleChange} name="e6" />}
                    label="I understand that if I'm giving out the whole backlog, I need to be cautious about whether to remove the duplicated SO."
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
                        control={<Checkbox checked={f} onChange={handleChange} name="f" />}
                        label="6. If involve Product Category, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={f1} onChange={handleChange} name="f1" />}
                label="I understand that the product category should be categorized by Supplier Prefix or Part Number. If the product category is defined by Supplier line, I've refered to [MRS].[dbo].[SEMI_IPnE_List] / [MRS].[dbo].[tblMappingBusinessUnit_Local]."
                />
                <FormControlLabel
                    control={<Checkbox checked={f2} onChange={handleChange} name="f2" />}
                    label="I understand whether the product category is stated clearly to categorize based on Part number level (directly from raw data)."
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
                        control={<Checkbox checked={g} onChange={handleChange} name="g" />}
                        label="7. If involve Inventory Type, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={g1} onChange={handleChange} name="g1" />}
                label="I understand the meaning of [Stock Ind]
                E: risk buy stock
                K(DBP): vendor consignment
                O: programming part
                W: customer consignment (VMI/ HUB)
                (blank) : normal stock"
                />
                <FormControlLabel
                    control={<Checkbox checked={g2} onChange={handleChange} name="g2" />}
                    label="I understand that when provide inventory report, should exclude vendor consignment stock."
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
                        control={<Checkbox checked={h} onChange={handleChange} name="h" />}
                        label="8. If involve Special Business or Net Treat, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={h1} onChange={handleChange} name="h1" />}
                label="I understand that for 'Net Treat business' , I will always see [Billing]=zero in tblBB and it happens for Sales Organization in SG13/TW33/TW34 . Avnet earns MGP only."
                />
                <FormControlLabel
                    control={<Checkbox checked={h2} onChange={handleChange} name="h2" />}
                    label="I understand that for 'Net Treat business' , since [Billing] always zero, when I pull  SO Backlog  from  tblBacklog, I should remember to remind user about this. If user wants us to exclude, I will set [Sales Organization] not in ('SG13, 'TW33', 'TW34') ."
                />
                <FormControlLabel
                    control={<Checkbox checked={h3} onChange={handleChange} name="h3" />}
                    label="I understand that for 'Net Treat business' and Special business, I can only segregate the Inventory as there is a field in mrs..tblInventoryMgmt. No clear indicator for special business because some based on Plant&Linecard, some by Material."
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
                        control={<Checkbox checked={i} onChange={handleChange} name="i" />}
                        label="9. If involve AU, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={i1} onChange={handleChange} name="i1" />}
                label="I understand the difference between [Region]='AU'  vs [AU]='Y'"
                />
                <FormControlLabel
                    control={<Checkbox checked={i2} onChange={handleChange} name="i2" />}
                    label="I understand that [AU]='Y' refer to  [MRS].[dbo].[tblMappingAUCTMList] , and only those within the valid period is AU."
                />
                <FormControlLabel
                    control={<Checkbox checked={i3} onChange={handleChange} name="i3" />}
                    label="I understand that [Region]='AU' formed in FY18. So, if I want to compare apple to apple for data before FY18, I have to refer to [AU]='Y'  { only for [Region] in ('China' , 'Taiwan', 'South Asia') }"
                />
                <FormControlLabel
                    control={<Checkbox checked={i4} onChange={handleChange} name="i4" />}
                    label="I understand the difference between [Group Customer] vs [AU Group Customer]='Y'"
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
                        control={<Checkbox checked={j} onChange={handleChange} name="j" />}
                        label="10. If involve DRMS, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={j1} onChange={handleChange} name="j1" />}
                label="DI: [Creation Fiscal Quarter],[SnapshotDate]=[Creation Fiscal Qtr], [Main/Alt] <>'A'(refer DRMS report logic)"
                />
                <FormControlLabel
                    control={<Checkbox checked={j2} onChange={handleChange} name="j2" />}
                    label="DW: [Billing Fiscal Qtr],[SnapshotDate]=[Billing Fiscal Qtr],[Design Attached]=Y,[DW Authorized Flag] = Y(refer DRMS report logic)"
                />
                <FormControlLabel
                    control={<Checkbox checked={j3} onChange={handleChange} name="j3" />}
                    label="DW#: [[Win Fiscal Qtr],[SnapshotDate]=[Win Fiscal Qtr] (refer DRMS report logic)"
                />
                </AccordionDetails>
            </Accordion>
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={k} onChange={handleChange} name="k" />}
                    label="11. If involve WebQuote and Pricing, have you referred to related Guideline?"
                />
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={l} onChange={handleChange} name="l" />}
                    label="12. If involve Fruit, have you referred to related Guideline?"
            />
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={m} onChange={handleChange} name="m" />}
                    label="13. If involve SalesForce, have you referred to related Guideline?"
            />
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                >
                    <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox checked={n} onChange={handleChange} name="n" />}
                        label="14. Have you considered the right Data Source? "
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={n1} onChange={handleChange} name="n1" />}
                label="I understand the concepts of different table types"
                />
                <FormControlLabel
                    control={<Checkbox checked={n2} onChange={handleChange} name="n2" />}
                    label="I understand the sources of different tables and have chosen the correct ones"
                />
                <FormControlLabel
                    control={<Checkbox checked={n3} onChange={handleChange} name="n3" />}
                    label="I have used 'with (nolock)' in my select clauses"
                />
                <FormControlLabel
                    control={<Checkbox checked={n4} onChange={handleChange} name="n4" />}
                    label="I have verified that the working data set is minimal in size by using explicit column list and adding filter criteria"
                />
                </AccordionDetails>
            </Accordion>
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={o} onChange={handleChange} name="o" />}
                    label="15. If involve EQEC, have you referred to related Guideline?"
            />
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={p} onChange={handleChange} name="p" />}
                    label="16. If involve OCR, have you referred to related Guideline?"
            />
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={q} onChange={handleChange} name="q" />}
                    label="17. If involve DP, have you referred to related Guideline?"
            />
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                >
                    <FormControlLabel 
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox checked={r} onChange={handleChange} name="r" />}
                        label="18. If involve MM/PR/PO, have you referred to related Guideline?"
                    />
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                <FormControlLabel
                control={<Checkbox checked={r1} onChange={handleChange} name="r1" />}
                label="I acknowledge that MM usually exclude 'IB','UB','NB2' when come to PO data"
                />
                <FormControlLabel
                    control={<Checkbox checked={r2} onChange={handleChange} name="r2" />}
                    label="I acknowledge that MM usually exclude 'KE','ZIRB','ZRBC','ZRBP','ZRBF','ZFCM','ZTRB' and 'ZRB%' when come to SO data"
                />
                <FormControlLabel
                    control={<Checkbox checked={r3} onChange={handleChange} name="r3" />}
                    label="I acknowledge that MM usually exclude 'SA32', 'TJ94', 'SG13','CS13','IH18' for all data"
                />
                <FormControlLabel
                    control={<Checkbox checked={r4} onChange={handleChange} name="r4" />}
                    label="I understand the meaning of Phantom %: 
                    ('3 Mth Total Batch Cost' - '3 Mth Total Adjusted Cost') / '3 Mth Total Batch Cost'
                    exclude all -ve outcome"
                />
                <FormControlLabel
                    control={<Checkbox checked={r5} onChange={handleChange} name="r5" />}
                    label="I understand the meaning of Turns:
                    ([3 Mth Total COGS]*4) / (([M-3 Inv]+[M0 Inv])/2)"
                />
                </AccordionDetails>
            </Accordion>
            <FormControlLabel className ={classes.singleQuestion}
                    control={<Checkbox checked={s} onChange={handleChange} name="s" />}
                    label="19. If involve MI, have you referred to related Guideline?"
            />
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