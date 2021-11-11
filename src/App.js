import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NevBar from './components/NevBar';
import Tickets from './components/Tickets';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateTicket from './components/CreateTicket';
import Dashboard  from './components/Dashboard';
import Ticket from './components/Ticket';
import { useState } from 'react';
import useToken from './components/useToken';
import SignUpCompleted from './components/SignUpCompleted';
import TicketUpdated from './components/TicketUpdated';
import  NotFound  from './components/NotFound';
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';
import Task from './components/Task';
import TaskUpdated from './components/TaskUpdated'


function App() {

  const { token, setToken } = useToken();


  return (
    <Router>
    <div className="App">
      <div className="Navbar">
        {token && <NevBar/>}
      </div>        
      <div className ="Content">
        <Switch>
          <Route exact path="/Login">
            <Login/>
          </Route>
          <Route exact path="/SignUp">
            <SignUp/>
          </Route>
          <Route exact path="/SignUpCompleted">
            <SignUpCompleted/>
          </Route>

          <Route exact path="/Tickets/Create">
            <CreateTicket/>
          </Route>
          <Route exact path="/Tickets/Updated">
            <TicketUpdated/>
          </Route>
          <Route path="/Tickets/Edit/:id">
            <Ticket/>
          </Route>
          <Route path="/Tickets">
            <div className ="Ticket-content">
              <Tickets/>
            </div>
          </Route>
                  
          <Route exact path="/Tasks/Create">
            <CreateTask/>
          </Route>
          <Route exact path="/Tasks/Updated">
            <TaskUpdated/>
          </Route>
          <Route path="/Tasks/Edit/:id">
            <Task/>
          </Route>
          <Route path="/Tasks">
            <Tasks/>
          </Route>
          <Route exact path="/Dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
