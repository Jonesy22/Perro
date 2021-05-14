import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import { setUserProfile } from '../data/actions';
import { connect, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { getUserProfile, getAllInvitations } from "../data/selectors";
import { useHistory } from "react-router-dom";

import {HiOutlineBell} from "react-icons/hi";


const Header = (props) => {

    const userProfile = useSelector(state =>  getUserProfile(state));
    const notifications = useSelector(state => getAllInvitations(state));
    console.log("notifications: ", notifications.length)
    let history = useHistory();

    function settingsClick() { 
        history.push('/settings')
    };
    function trackingClick() {
            if (Object.entries(userProfile).length === 0) {
                history.push('/')
            }
            else {
                history.push('/tracking')
            }
    };
    
    const navButton = {
            backgroundColor: "white",
            color:"rgba(0, 0, 0, 0.54)",
            height:"43px",
            width: "90px",
            bordeRadius:"2px",
            borderColor:"white",
            fontFamily:"Roboto, sans-serif",
            fontSize:"14px"
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" onClick={trackingClick}><span style={{fontFamily:"Roboto"}}>Perro</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            {Object.entries(userProfile).length != 0 && notifications.length > 0 && <button type="button" style={navButton} class="btn btn-primary" onClick={settingsClick}>
                Teams <span style={{color: "#0275d8"}}><HiOutlineBell /></span>
            </button>}
            {Object.entries(userProfile).length != 0 && notifications.length == 0 && <button type="button" style={navButton} class="btn btn-primary" onClick={settingsClick}>
                Teams
            </button>}
            <div style={{marginRight:5, marginLeft:5}}>    
                {Object.entries(userProfile).length === 0 && <GoogleLoginButton/>}
            </div>
            <div>
            {Object.entries(userProfile).length != 0 && <GoogleLogoutButton/>}
            </div>
            </div>
        </nav>
    );
}

export default connect(
    state => ({ userProfile: getUserProfile(state), inivtations: getAllInvitations(state) }),
    { setUserProfile }
  )(Header);