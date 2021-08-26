import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NevBar from './components/NevBar';
import Tickets from './components/Tickets';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <div>
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
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
