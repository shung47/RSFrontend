import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NevBar from './components/NevBar';
import Tickets from './components/Tickets';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateTicket from './components/CreateTicket';

function App() {
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
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
