import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { getUserProfile } from "../data/selectors";
import { useHistory } from "react-router-dom";


const Header = (props) => {
    let history = useHistory();
    function settingsClick() {
        history.push('/settings')
    };
    function trackingClick() {
        history.push('/tracking')
    };
    
    const navButton = {
            backgroundColor: "white",
            color:"rgba(0, 0, 0, 0.54)",
            height:"43px",
            width: "85px",
            bordeRadius:"2px",
            borderColor:"white",
            fontFamily:"Roboto, sans-serif",
            fontSize:"14px"
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/"><span style={{fontFamily:"Roboto"}}>Perro</span></a>
            <button type="button"class="btn btn-primary" style={navButton} onClick={trackingClick}>Tracking</button>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <button type="button" style={navButton} class="btn btn-primary" onClick={settingsClick}>Settings</button>
            <div style={{marginRight:5, marginLeft:5}}>    
                <GoogleLoginButton/>
            </div>
            <div>
                <GoogleLogoutButton/>
            </div>
            </div>
        </nav>
    );
}

export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(Header);