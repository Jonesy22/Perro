import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";



const GoogleLogoutButton = () => {

    let history = useHistory();

    const logout = async (res) => {

        const responseFromGoogle = await fetch("http://localhost:5000/api/v1/auth/logout", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "true"
            }
        })
        const data = await responseFromGoogle.json();
        if (data.error) throw new Error(data.error)
        
        console.log("data from user: ", data);

        console.log('Logout success!:');
        history.push('/');
    };


    return (
        <div>
        <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
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