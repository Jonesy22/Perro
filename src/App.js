import logo from './logo.svg';
import './App.css';
import 'react-bootstrap'
import React from 'react';
// components
import LeftProjectView from './components/LeftProjectView'
import RightProjectView from './components/RightProjectView'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom"

let LandingPageComponent = props => <LandingPage/>

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" exact component={() => <LandingPage />}/>
            <Route path="/tracking" exact component={TrackingView}/>
          </Switch>
      </Router>

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
  )
}

export default App;
