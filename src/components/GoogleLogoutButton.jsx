import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";
import credentials from '../config/client'



const GoogleLogoutButton = () => {

    const clientID = credentials.clientID;

    let history = useHistory();

    const logout = (res) => {
        console.log('Logout success!:');
        window.location.href = "/";
        // history.push('/');
    };


    return (
        <div>
        <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            cookiePolicy={'single_host_origin'}
            style={{marginTop: '100px' }}
        />
    </div>
    )
}
export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(GoogleLogoutButton);