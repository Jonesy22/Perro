import './App.css';
import 'react-bootstrap'
import React from 'react';
import { connect, useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
// components
import LeftProjectView from './components/LeftProjectView'
import RightProjectView from './components/RightProjectView'
import SettingsView from './components/SettingsView'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom"
import { history } from './data/configureStore'
import { getAllInvitations } from './data/selectors';
import { notification } from 'antd';


class App extends React.Component {
  render() {
    if(this.props.invitations.length > 0){
      notify();
    }
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={() => <LandingPage />}/>
            <Route path="/tracking" exact component={TrackingView}/>
            <Route path="/auth/login" exact component={LoginPage}/>
            <Route path="/settings" exact component={SettingsView}/>
          </Switch>
        </Router>
        
      </div>

    );
  }
  
}

const TrackingView = () => {
  return (
    <div>
      
      <div className="float-container">
        <Header />
        <div className="float-child-left">
          <LeftProjectView />
        </div>
        <div className="float-child-right">
          <RightProjectView />
        </div>  
      </div>
      <Footer />
    </div>
  
  );
}
const notify = () => toast.info("New team invitation",{
  position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

export default connect(
  (state) => ( {invitations: getAllInvitations(state) })
)(App);
