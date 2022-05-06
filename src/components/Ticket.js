import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  ThemeOptions
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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'react-moment';
import PersonIcon from '@material-ui/icons/Person';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import BusinessReivewList from './BusinessReviewList';
import { DataGrid } from '@material-ui/data-grid';
import CodeReivewList from './CodeReviewList';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  root: {
    //minWidth: 275,
    display:'flex',
    justifyContent:'space-between',
  },
  editor: {
    display: 'flex',
    position: 'relative',
    left:10,
  },
  content:{
    display: 'flex',
    position: 'relative',
    left:10,
    textAlign: 'left'

  },
  btn:{
    display: 'flex',
    position: 'relative',
    right:10,
    margin:5
  },
  btnContent:{
    display: 'inline-flex',
    position: 'relative',
  },
  lastModification:{
    color:'gray',
    fontSize:10
  },
  approveTime:{
    marginLeft:15
  },
  parentFrid:{
    "@media(min-width: 720px)":{
      display:'flex'
    }
  }

});

const dbStatus = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Completed',
    label: 'Completed'
  }

]

const approvals = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Approved',
    label: 'Approved'
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
  },
  {
    value: 'CYSpecialApproval',
    label: 'CYSpecialApproval'
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
{
  value: 'Cancelled',
  label: 'Cancelled'
}
]


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TicketDetails (props) {
  const { token } = useToken();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const history =useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [businessReview, setBusinessReview] = useState(null);
  const [isRPA, setIsRPA] = useState(null);
  const [approvalMsg, setApprovalMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [firstCRwindow, setFirstCRwindow] = useState(false);
  const [secCRwindow, setSecCRwindow] = useState(false);
  const [brWindow, setBrWindow] = useState(false);
  const [dbWindow, setDbWindow] = useState(false);
  const [users, setUsers] = useState(null);
  const [saUsers, setSaUsers] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [dbControlList, setDbControlList]=useState(null);
  const [comments, setComments]=useState([]);
  const [newComment, setNewComment]=useState("");
  const classes = useStyles(); 
  const [openApproveMsg, setApproveMsgOpen] = useState(false);
  const [openErrorMsg, setErrorMsgOpen] = useState(false);
  const [canChangeStatus, setCanChangeStatus] = useState(false);
  const [canChangeCode1Status, setCanChangeCode1Status] = useState(false);
  const [canChangeCode2Status, setCanChangeCode2Status] = useState(false);
  const [modifiedTables, setModifiedTables] = useState([]);
  const [modifiedTable, setModifiedTable] = useState();
  const [isSending, setIsSending ] = useState(false);
  const [pageAccessTime, setPageAccessTime] = useState();
  const[isSaving, setIsSaving] = useState(false);
  const[isActivateSaving, setIsActivateSaving] = useState(false);
  const[isApproving, setIsApproving] = useState(false);
  const[isActivateApproving, setIsActivateApproving] = useState(false);
  

  const modifiedTableColumn = [
    {
      field: 'deleteBtn',
      headerName: ' ',
      sortable: false,
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) =>handleDeleteTable(e, cellValues.id)}
          >
            Delete
          </Button>
        );
      }
    },
    {
      field: 'tableName',
      headerName: 'Object Name',
      width: 350,
      editable: false,
    },
    {
      field: 'summary',
      headerName: 'Summary',
      width: 1500,
      editable: false,
    }   
    ];

    if(!token)
    {
      history.push('/login');
      window.location.reload();
    }

  var user =jwtDecode(token);

    

  const handleChange = (event) => {
    event.preventDefault();
    setTicket({
      ...ticket,
      [event.target.name]: event.target.value
    });
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value
    });
  };

  const handleTableChange = (event) => {
    event.preventDefault();
    setModifiedTable({
      ...modifiedTable,
      [event.target.name]: event.target.value
    });
  };

  const handleDBChange= (event) => {
    event.preventDefault();
    var result = dbControlList.find(userList => {return userList.database===event.target.value});
    setModifiedTable({
      ...modifiedTable,
      [event.target.name]: event.target.value
    });
    if(event.target.value){
      setTicket({
        ...ticket,
        dbmaster:result.employeeId
      });
    }
  };

  const handleDelete = () =>{
    fetch(`${process.env.REACT_APP_API_URL}Tickets/`+ id, {
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
              setErrorMsgOpen(true);
              setErrorMsg()
            }else
            {             
              history.push('/tasks/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
          setErrorMsgOpen(true);
      })
  }

  const handleApprovalChange =(e) =>{
    e.preventDefault();
    setIsApproving(true);
    setIsActivateApproving(true);
    
    const approval ={ApprovalType: e.target.name,ApprovalStatus:e.target.value};

     fetch(`${process.env.REACT_APP_API_URL}Tickets/`+ id, {
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
              setIsActivateApproving(false);
              var now = new Date();
              var timeNow = now.toISOString()
              setTicket({
                ...ticket,
                [e.target.name] : approval.ApprovalStatus,
                [e.target.name +'Time']: timeNow
              });
              setApprovalMsg("The " + e.target.name + " is " + approval.ApprovalStatus );
              setErrorMsg(null);
              setApproveMsgOpen(true);
            }
        }).catch(err => {
          setErrorMsg(err.message);
      })
  }

  const handleEmailReminder = (e) =>{
    e.preventDefault();
     setIsSending(true);
    ticket.isRpa = isRPA;
    ticket.businessReview = businessReview;

     fetch(`${process.env.REACT_APP_API_URL}Tickets/`+ id, {
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
              setErrorMsgOpen(true)
            }else
            {
              sendEmail();
            }
        }).catch(err => {
          setErrorMsg(err.message);
          setApprovalMsg(null);
          setErrorMsgOpen(true)
      })
  }

  function sendEmail(){
    fetch(`${process.env.REACT_APP_API_URL}Tickets/SendEmail/`+id,{
      method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'bearer '+ token,
        },
        body: JSON.stringify(ticket)
    }).then(res =>{
      if(!res.ok)
      {
        setApprovalMsg(null);
        res.text().then(text => {setErrorMsg(text)})
        setErrorMsgOpen(true)
        setOpen(false);
      }else{
        setErrorMsg(null)
        setApprovalMsg('Email Sent');
        setApproveMsgOpen(true)
        setOpen(false);
      }
    })
  }

  const handleFirstClose = () => {
    setFirstCRwindow(false);
  };
  const handleFirstOpen = () => {
    setFirstCRwindow(true);
    setCanChangeCode1Status(false);
  };
  const handleSecClose = () => {
    setSecCRwindow(false);
    setCanChangeCode2Status(false);
  };
  const handleSecOpen = () => {
    setSecCRwindow(true);
  };
  const handleBrClose = () => {
    setBrWindow(false);
  };
  const handleBrOpen = () => {
    setBrWindow(true);
    setCanChangeStatus(false);
  };

  const handleDbClose = () => {
    setDbWindow(false);
  };
  const handleDbOpen = () => {
    setDbWindow(true);
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleClickOpen = () => {
    setIsSending(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleApproveMsgClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setApproveMsgOpen(false);
  };

  const handleErrorMsgClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMsgOpen(false);
  };

  useEffect(()=>{
    if(isActivateSaving)
    {
      setIsSaving(true);
    }else{
      setIsSaving(false);
    }

  },[isActivateSaving])

  useEffect(()=>{
    if(isActivateApproving)
    {
      setIsApproving(true);
    }else{
      setIsApproving(false);
    }

  },[isActivateApproving])


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsActivateSaving(true);   
    
    ticket.isRpa = isRPA;
    ticket.businessReview = businessReview;
        fetch(`${process.env.REACT_APP_API_URL}Tickets/`+ id +`/`+pageAccessTime, {
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
              setErrorMsgOpen(true)
              setIsActivateSaving(false);
            }else
            {
              history.push('/tickets/updated');
            }
        }).catch(err => {
          setErrorMsg(err.message);
          setApprovalMsg(null);
          setErrorMsgOpen(true)
      })
      
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tickets/`+ id,{
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
            var now = new Date();
            var timeNow = now.toISOString();
            setPageAccessTime(timeNow);
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
}, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Users/`,{
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
    fetch(`${process.env.REACT_APP_API_URL}Users/SA`,{
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
            setSaUsers(data);
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}Tasks/`,{
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
            setTasks(data.filter(e=>e.status!=='Done'&&!e.isDeleted));
        })
        .catch(err => {
            setErrorMsg(err.message);
        })
  }, []);

  useEffect(() => {
    getAllComment();
  }, []);

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() =>{
    getAllModifiedTables();
  }, []);

  async function getAllComment(){
     fetch(`${process.env.REACT_APP_API_URL}TicketComments/`+ id,{
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
          setComments(data);
      })
      .catch(err => {
          setErrorMsg(err.message);
      })
  };

  const handleAddComment = (e) =>{
    e.preventDefault();
    if(newComment!=="")
    {
      var comment = { CommentContent: newComment.comment, TicketId: id}
      fetch(`${process.env.REACT_APP_API_URL}TicketComments/`, {
             method:'POST',
             headers:{
                 'Content-Type':'application/json',
                 'Authorization':'bearer '+ token,
             },
             body: JSON.stringify(comment)           
         }).then(res=>{
           if(res.ok)
           {
             getAllComment()
             
           }
         }
         ).catch(err => {
           setErrorMsg(err.message);
           setApprovalMsg(null);
           setErrorMsgOpen(true)
           
       })
       setNewComment("")
       document.getElementById('comment').value = "";
    }            
  }

   function handleDeleteComment(e, id) {
    e.preventDefault();
       fetch(`${process.env.REACT_APP_API_URL}TicketComments/`+id, {
          method:'DELETE',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'bearer '+ token,
          }             
      }).then(res=>{
        if(res.ok)
          {
            getAllComment()
          }
      }
      ).catch(err => {
        setErrorMsg(err.message);
        setApprovalMsg(null);
    })
  }

  async function getAllModifiedTables(){
    fetch(`${process.env.REACT_APP_API_URL}TicketModifiedTables/`+ id,{
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
         setModifiedTables(data);
         if(data.length!==0)
         {
           setModifiedTable({...modifiedTable, databaseName: data[0].databaseName, tableName:'', summary:''});
         }else{
          setModifiedTable(" ");
         }
     })
     .catch(err => {
         setErrorMsg(err.message);
         setErrorMsgOpen(true);
     })
 };

 const handleAddTable = (e) =>{
  e.preventDefault();
  if(modifiedTable.databaseName&&modifiedTable.tableName)
  {
    var table = { DatabaseName: modifiedTable.databaseName, TableName:modifiedTable.tableName, TicketId: id, Summary: modifiedTable.summary}
    fetch(`${process.env.REACT_APP_API_URL}TicketModifiedTables/`, {
           method:'POST',
           headers:{
               'Content-Type':'application/json',
               'Authorization':'bearer '+ token,
           },
           body: JSON.stringify(table)           
       }).then(res=>{
         if(res.ok)
         {
           getAllModifiedTables()
           
         }else
         {
          res.text().then(text => {setErrorMsg(text)})
          setErrorMsgOpen(true);
         }
       }
       ).catch(err => {
         setErrorMsg(err.message);
         setApprovalMsg(null);
         setErrorMsgOpen(true);
         
     })
     setModifiedTable({...modifiedTable, databaseName: modifiedTable.databaseName, tableName:'', summary:''});

  }else{
    setErrorMsg("Please input database name and object name");
    setErrorMsgOpen(true);
  }            
}

function handleDeleteTable(e, id) {
  e.preventDefault();
     fetch(`${process.env.REACT_APP_API_URL}TicketModifiedTables/`+id, {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'bearer '+ token,
        }             
    }).then(res=>{
      if(res.ok)
        {
          getAllModifiedTables()
        }else
        {
         res.text().then(text => {setErrorMsg(text)})
         setErrorMsgOpen(true);
        }
    }
    ).catch(err => {
      setErrorMsg(err.message);
      setApprovalMsg(null);
  })
}

  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [files, setFiles] = useState([]);

  const fileChangeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  async function getFiles(){
    fetch(`${process.env.REACT_APP_API_URL}Tickets/GetFiles/`+ id,{
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
        setFiles(data);
     })
     .catch(err => {

     })
 };

  const handleFileUpload = (e) => {
    e.preventDefault();
      const formData = new FormData();

      if(selectedFile!=null){
      formData.append('files', selectedFile);

        fetch(
          `${process.env.REACT_APP_API_URL}Tickets/uploadfile/`+ id,
          {
            method: 'POST',
            headers:{
              'Authorization':'bearer '+ token,
            }, 
            body: formData,
          }
        ).then(res=>{
          if(res.ok)
          {
            getFiles()
            setApprovalMsg("Uploaded file successfully")
            setApproveMsgOpen(true);
          }
        }
        ).catch(err => {
          setErrorMsg(err.message);
          setApprovalMsg(null);
        }) 
      }
    };

    const handleBusinessReviewListCallback = (childData) =>{
      setCanChangeStatus({childData})
    }

    const handlCode1ReviewListCallback = (childData) =>{
      setCanChangeCode1Status({childData})
    }

    const handlCode2ReviewListCallback = (childData) =>{
      setCanChangeCode2Status({childData})
    }

    const handleFileDownload = (e) => {
      e.preventDefault();
      window.open(`${process.env.REACT_APP_API_URL}Tickets/Downloadfile/`+ id +'/'+e.target.outerText);
      };

  return (
    <Grid className = {classes.parentFrid}>
      <Grid
              item
              md={7}
              xs={12}
    >
    <Container component="main" maxWidth="md">
    <form onSubmit={handleSubmit} 
      autoComplete="off"
      {...props}
    >
      <Card style={{marginBottom:20}}>
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
                label="Ticket Name"
                name="title"
                onChange={handleChange}
                required
                value={ticket.title}
                variant="outlined"
                inputProps={{ maxLength: 80 }}
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
              >
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
                disabled = {user.EmployeeId!==ticket.assignee}
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
                label="Assignee(Responsible)"
                name="assignee"
                onChange={handleChange}
                required
                value={ticket.assignee}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >{users.map((option) => (
                <option
                  disabled ={option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
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
                  disabled = {option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
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
                 disabled = {option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
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
                value={ticket.creatorName}
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
                inputProps={{ maxLength: 999 }}
              />
            </Grid>
            {/* <Grid item
                md={12}
                xs={12}
                style={{display:'flex'}}
                >
              <Grid item xs={12} md={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked={businessReview} color="primary" />}
                      label="Business review required"
                      onChange = {(e) =>setBusinessReview(e.target.checked)}                    
                  />
              </Grid>
                  <Grid item xs={12} md={6} className="CheckBox">
                  <FormControlLabel 
                      control={<Checkbox checked= {isRPA} color="primary" />}
                      label="RPA or DB changes required"
                      onChange = {(e) =>setIsRPA(e.target.checked)}
                  />
              </Grid>
            </Grid> */}
            {modifiedTable&&dbControlList&&<Grid item
                md={5}
                xs={12} >
                    <TextField
                    fullWidth
                    type="text"
                    label="Modified Database"
                    name="databaseName"
                    onChange={handleDBChange}
                    id="databaseName"
                    variant="outlined"
                    value={modifiedTable.databaseName}
                    select
                    SelectProps={{ native: true }}
                  ><option></option>
                  {Array.from(dbControlList).map((option) => (
                    <option
                      key={option.database}
                      value={option.database}
                    >
                      {option.database}
                    </option>
                  ))}</TextField>
                  <TextField style={{marginTop:10}}
                    fullWidth
                    type="text"
                    label="Object Name"
                    name="tableName"
                    onChange={handleTableChange}
                    id="tableName"
                    variant="outlined"
                    value={modifiedTable.tableName}
                  />
                  <TextField style={{marginTop:10}}
                    fullWidth
                    type="text"
                    label="Summary"
                    name="summary"
                    onChange={handleTableChange}
                    id="summary"
                    variant="outlined"
                    value={modifiedTable.summary}
                    inputProps={{ maxLength: 400 }}
                  />
                  <div style={{ alignContent:"flex-start", display : "flex", marginTop:8 }}>
                    <Button
                      variant="contained" 
                      color ="primary"
                      disabled={!isRPA}
                      onClick={handleAddTable}
                      > 
                      Add object
                    </Button>
                  </div>                  
            </Grid>}
            <Grid md={12}>
                <CardHeader
                  title="Modified Objects"
                />
                </Grid>
              <div style={{ height:400, width: '95%', position:'center',margin: '0 auto', marginBottom:20 }}>
              {modifiedTables && <DataGrid
              rows={modifiedTables}
              columns={modifiedTableColumn}
              rowHeight={40}
              pageSize={20}           
              />}
              </div>
            </Grid>
          
          {(ticket.status==='Reviewing'||ticket.status==='Completed')&&users&&<Grid
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
                disabled = {!(user.EmployeeId === "043138" || user.EmployeeId === "041086"||user.EmployeeId==="057533") }
                SelectProps={{ native: true }}
              ><option></option>{users.map((option) => (
                <option
                disabled = {option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
                </option>
              ))}</TextField>
              <div >
              
                <div style={{ alignContent:"flex-start", display : "flex" , marginTop:10}}>
                <Button 
                    variant="contained" 
                    onClick={handleFirstOpen} 
                    color ="primary"
                    disabled = {user.EmployeeId !== ticket.primaryCodeReviewer}
                    >                    
                    Approval
                </Button>
                {ticket.primaryCodeApproval==="Approved"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    > 
                    {ticket.primaryCodeApproval}
                </Button>}
                </div>
                <div>
                {ticket.primaryCodeApproval==="Approved"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss" className={classes.approveTime}>
              {ticket.primaryCodeApprovalTime}
              </Moment></p>}
              </div>                
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
                disabled = {!(user.EmployeeId === "041086"||user.EmployeeId === "043138"||user.EmployeeId==="057533") }
                SelectProps={{ native: true, default: ""}}
              ><option></option>{users.map((option) => (
                <option
                  disabled = {option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
                </option>
              ))}</TextField>
              <div style={{ alignContent:"flex-start", display : "flex", marginTop:10 }}>
                <Button 
                    variant="contained" 
                    onClick={handleSecOpen} 
                    color ="primary"
                    disabled = {user.EmployeeId !== ticket.secondaryCodeReviewer}
                    > 
                    Approval
                </Button>
                {ticket.secondaryCodeApproval==="Approved"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    > 
                    {ticket.secondaryCodeApproval}                    
                </Button>}
              </div>
              {ticket.secondaryCodeApproval==="Approved"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss" className={classes.approveTime}>
                    {ticket.secondaryCodeApprovalTime}
                    </Moment></p>}
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
                disabled = {user.EmployeeId !== ticket.assignee }
                SelectProps={{ native: true }}
              ><option></option>{users.map((option) => (
                <option
                  disabled = {option.inActive}
                  key={option.employeeId}
                  value={option.employeeId}
                >
                  {option.name}
                </option>
              ))}</TextField>
              <div style={{ alignContent:"flex-start", display : "flex", marginTop:10 }}>
                <Button 
                    variant="contained" 
                    onClick={handleBrOpen} 
                    color ="primary"
                    disabled = {user.EmployeeId !== ticket.businessReviewer}
                    > 
                    
                    Approval
                </Button>
                {ticket.businessApproval==="Approved"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    > 
                    {ticket.businessApproval}  
                </Button>}
              </div>
              {ticket.businessApproval==="Approved"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss" className={classes.approveTime}>
                    {ticket.businessApprovalTime}
                    </Moment></p>}
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
                disabled = {!(user.EmployeeId === "043138" || user.EmployeeId === "041086"||user.EmployeeId ==="057533") }
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
              <div style={{ alignContent:"flex-start", display : "flex", marginTop:10 }}>
                {ticket.saLeaderApproval==="Approved"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    > 
                    {ticket.saLeaderApproval}
                </Button>}
              </div>
              {ticket.saLeaderApproval==="Approved"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss">
                    {ticket.saLeaderApprovalTime}
                    </Moment>
                </p>}             
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
                disabled = {user.EmployeeId !== "904218"&& user.EmployeeId !=="902128"}
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
              <div style={{ alignContent:"flex-start", display : "flex", marginTop:10 }}>
                {ticket.directorApproval==="Approved"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    >{ticket.directorApproval} 
                </Button>}
              </div>
              {ticket.directorApproval==="Approved"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss">
                    {ticket.directorApprovalTime}
                    </Moment></p>}               
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >{saUsers&&<TextField
              fullWidth
              label="SA Master"
              name="dbmaster"
              onChange={handleChange}
              value={ticket.dbmaster}
              variant="outlined"
              select
              disabled = {!(user.EmployeeId === "043138" || user.EmployeeId === "041086"||user.EmployeeId==="057533")}
              SelectProps={{ native: true }}
            ><option></option>{saUsers.map((option) => (
              <option
                key={option.employeeId}
                value={option.employeeId}
              >
                {option.name}
              </option>
            ))}</TextField>}             
              <div style={{ alignContent:"flex-start", display : "flex", marginTop:10 }}>
                <Button 
                    variant="contained" 
                    onClick={handleDbOpen} 
                    color ="primary"
                    disabled = {!(user.EmployeeId === ticket.dbmaster||user.EmployeeId==="043138"||user.EmployeeId==="041086")||(ticket.type!=="CYSpecialApproval"&&ticket.saLeaderApproval!="Approved")}
                    >                    
                    Status
                </Button>
                {ticket.dbMasterApproval==="Completed"&&<Button style ={{color:'black'}}
                    disabled
                    variant="outlined" 
                    color ="primary"
                    startIcon = {<CheckIcon style={{ color: 'green' }}/>}
                    > 
                    {ticket.dbMasterApproval}                
                </Button>}
              </div>
              {ticket.dbMasterApproval==="Completed"&&<p style={{display:'flex'}}><Moment format="YYYY/MM/DD HH:mm:ss" className={classes.approveTime}>
                    {ticket.dbMasterApprovalTime}
                    </Moment></p>}
            </Grid>              
          </Grid>}
          
        </CardContent>}
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
{/*          {ticket&& <Button 
          variant="contained" 
          onClick={handleClickOpen} 
          color ="secondary"
          disabled = {ticket.status!=="Reviewing"}
          > 
          Send reminding Email
          </Button>} */}
          {!isSaving&&<Button
            color="primary"
            variant="contained"
            type="submit"         
          >
            Save
          </Button>}
          {isSaving&&<Button
            disabled
            color="primary"
            variant="contained"
            type="submit"             
          >
            Saving...
          </Button>}
          
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
          Need someone to approve your ticket? Please click the send and it will remind all approvers.
        </DialogContentText>
{/*         {users&&<div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleEmailChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {users.map((user) => (
                <MenuItem key={user.email} value={user.email}>
                  <Checkbox checked={personName.indexOf(user.email) > -1} />
                  <ListItemText primary={user.email} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!isSending&&<Button onClick={handleEmailReminder}type="submit"               
                variant="contained"
                color="primary">Send</Button>}
        {isSending&&<Button onClick={handleEmailReminder}type="submit"               
                variant="contained"
                color="primary" disabled>Sending...</Button>}
      </DialogActions>
    </Dialog>
    {ticket&&<Dialog open={firstCRwindow} onClose={handleFirstClose} maxWidth="md">
      <DialogTitle>Primary Code Review</DialogTitle>
      <DialogContent>
        <CodeReivewList handleCodeReviewListCallback = {handlCode1ReviewListCallback} reviewType="PrimaryCodeReivew"/>     
      </DialogContent>
      <DialogContent>
        <TextField
            style={{width:'30%'}}
            label="Primary Code Approval"
            name="primaryCodeApproval"
            onChange={(e)=>handleApprovalChange(e)}
            required
            select
            disabled = {!canChangeCode1Status||isApproving}
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
    {ticket&&<Dialog open={secCRwindow} onClose={handleSecClose} maxWidth="md">
      <DialogTitle>Secondary Code Review</DialogTitle>
      <DialogContent>
        <CodeReivewList handleCodeReviewListCallback = {handlCode2ReviewListCallback} reviewType="SecondaryCodeReivew"/>    
      </DialogContent>
        <DialogContent>
          <TextField
                style={{width:'30%'}}
                label="Secondary Code Approval"
                name="secondaryCodeApproval"
                onChange={(e)=>handleApprovalChange(e)}             
                required
                select
                disabled = {!canChangeCode2Status||isApproving}
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
    {ticket&&<Dialog open={brWindow} onClose={handleBrClose} maxWidth="md">
      <DialogTitle>Business Review</DialogTitle>
      <DialogContent>
        <BusinessReivewList handleBusinessReviewListCallback = {handleBusinessReviewListCallback} reviewType="BusinessReview"/>     
      </DialogContent>
        <DialogContent style={{minHeight:100}}>
          <TextField 
              style={{width:'30%'}}                        
              label="BusinessApproval"
              name="businessApproval"
              onChange={(e)=>handleApprovalChange(e)}
              required
              select
              disabled = {(!canChangeStatus)||isApproving}
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
          <DialogContentText >
            <div className="Warning-text">{errorMsg}</div>            
          </DialogContentText>       
        </DialogContent>
      <DialogActions>
        <Button color="primary"  variant="contained" onClick={handleBrClose}>Ok</Button>
      </DialogActions>
    </Dialog>}
    {ticket&&<Dialog open={dbWindow} onClose={handleDbClose}>
      <DialogTitle>Database modification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Is it complete?
        </DialogContentText>       
      </DialogContent>
        <DialogContent>
          <TextField
                fullWidth
                label="DbApproval"
                name="dbApproval"
                onChange={(e)=>handleApprovalChange(e)}
                required
                select
                SelectProps={{ native: true }}
                value={ticket.dbmasterApproval}
                variant="outlined"
            >
                {dbStatus.map((option) => (
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
        <Button color="primary"  variant="contained" onClick={handleDbClose}>Ok</Button>
      </DialogActions>
    </Dialog>}
    </Container>
    </Grid>
        <Grid item
              md={4}
              xs={12}               >
              <Card>
              <div style={{maxHeight:600, overflow: "auto"}}>
                <CardHeader title="Comments" />
                  {comments.map(({id, creator, commentContent, lastModificationDateTime, creatorId }) => (
                  <Card key={id} style={{margin:15}}>

                    <CardContent className={classes.root}>
                      <div>
                      <Typography className={classes.editor}>
                        <PersonIcon/>{creator}
                      </Typography>             
                      <p></p>
                      <Typography className={classes.content}>
                      <p style={{whiteSpace: "pre-line"}}> {commentContent}</p>
                      </Typography>
                      </div>
                      <div style={{textAlign:"end"}}>
                        <div  className={classes.btnContent}>
                          <div>
                            <Typography className={classes.lastModification}>
                            <Moment format="YYYY/MM/DD HH:mm:ss">
                                {lastModificationDateTime}
                            </Moment>                          
                            </Typography>
                          </div>
                            {/* <Link disabled className={classes.btn} key={id} onClick={(e)=>handleDeleteComment(e, id)}>
                              Delete
                            </Link> */}                        
                        </div>
                      </div>              
                    </CardContent>
                  </Card>
                    
                  ))}
              </div>
                <Grid item
                md={11}
                xs={12} >
                    <TextField style={{marginLeft:10, marginTop:10 }}
                    type="text"
                    multiline 
                    fullWidth
                    label="Comment"
                    name="comment"
                    onChange={handleCommentChange}
                    id="comment"
                    variant="outlined"
                  />
                  <div style={{ alignContent:"flex-start", display : "flex" }}>
                    <Button style={{margin:10}}
                      variant="contained" 
                      onClick={(e)=>handleAddComment(e)} 
                      color ="primary"
                      > 
                      Add Comment
                    </Button>
                  </div>
                </Grid>
              </Card>
              <Card style={{marginTop:20, marginBottom:20}}>
              <CardHeader title="Attachments" />
                <div>
                    <input type="file" name="file" onChange={fileChangeHandler} />
                    {selectedFile&&isFilePicked ? (
                      <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                          lastModifiedDate:{' '}
                          {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p>Select a file to show details</p>
                    )}
                    <div>
                      <button onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>
                <div className={classes.demo}>
                <List>
                  {files.map((file)=>(
                    <ListItem button value={file} onClick={(event) => handleFileDownload(event)}>
                      <ListItemIcon>
                        <GetAppIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary={file}                       
                      />
                    </ListItem>),
                  )}
                </List>
              </div>
              </Card>
      </Grid>
      <Snackbar open={openApproveMsg} autoHideDuration={6000} onClose={handleApproveMsgClose}>
        <Alert onClose={handleApproveMsgClose} severity="success">
          {approvalMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleErrorMsgClose}>
        <Alert onClose={handleErrorMsgClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

