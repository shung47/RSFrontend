import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Subject from '@material-ui/icons/Subject';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import useToken from './useToken';
import jwtDecode from 'jwt-decode';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sectionDesktop: {
    display: 'flex',
    position: 'absolute',
    right: 20,
    [theme.breakpoints.up('md')]: {
      display: 'flex',   
    },
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { token } = useToken();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose =( event) => {
    setAnchorEl(null);
  }
  
  var user =jwtDecode(token);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    localStorage.clear();
    window.location.replace("/login");
  };



  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
    <div className={classes.root}>    
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
              CDBA LOG - {process.env.REACT_APP_ENV}
          </Typography>
          {/* <div className={classes.sectionDesktop}>
            <IconButton aria-label=" notifications" color="inherit" onClick= {handleNotificationClick} >
              <Badge badgeContent={"!"} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div> */}
        </Toolbar>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
        >
          <MenuItem onClick={(e) => {
              e.preventDefault();
              window.location.href='/PendingTickets';
            }}>Pending tickets</MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h3 style={{ alignContent:"flex-start", display : "flex" }}>{user.Name}</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            {/* <ListItem button component={Link} to="/Dashboard">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItem>  */}
            <ListItem button component={Link} to="/Tasks">
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Tasks"/>
            </ListItem> 
            <ListItem button component={Link} to="/Tickets">
              <ListItemIcon><Subject /></ListItemIcon>
              <ListItemText primary="Tickets"/>
            </ListItem>
            <ListItem button onClick ={handleClick}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Log Out"/>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>    
    </div>
    </ClickAwayListener>
  );
}
