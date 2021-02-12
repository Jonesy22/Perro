import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";



const GoogleLogoutButton = () => {

    let history = useHistory();

    const logout = async (res) => {

        await fetch("/api/v1/auth/logout", {
            method: "DELETE"
        })

        console.log('Logout success!:');
        history.push('/');
    };


    return (
        <div>
        <GoogleLogout
            clientId={process.env.CLIENT_ID}
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