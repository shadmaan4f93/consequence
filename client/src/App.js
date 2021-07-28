
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {getUserToken, clearUser} from './helpers/utils';


import './App.css';

import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const userToken = getUserToken()

  const logout = (event) => {
    clearUser();
    window.location.href = '/login'
	}
  

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Consequence</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {userToken ? 
                <li className="nav-item">
                  <span className="nav-link" onClick={logout} >Logout</span>
                </li>: (
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
              )}
              
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
  </div>
  </Router>
  );
}

export default App;
