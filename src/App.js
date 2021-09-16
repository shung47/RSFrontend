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


function App() {

  const { token, setToken } = useToken();

  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
    <Router>
    <div className="App">
      <div className="Navbar">
        <NevBar/>
      </div>        
      <div className ="Content">
        <Switch>
          <Route exact path="/Login">
            <Login/>
          </Route>
          <Route exact path="/SignUp">
            <SignUp/>
          </Route>
          <Route exact path="/Tickets">
            <div className ="Ticket-content">
              <Tickets/>
            </div>
          </Route>
          <Route exact path="/Tickets/Create">
            <CreateTicket/>
          </Route>
          <Route exact path="/Dashboard">
            <Dashboard/>
          </Route>
          <Route path="/Tickets/Edit/:id">
            <Ticket/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
