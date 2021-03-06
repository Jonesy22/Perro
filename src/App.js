import './App.css';
import 'react-bootstrap'
import React from 'react';
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


class App extends React.Component {
  render() {
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

export default App;
