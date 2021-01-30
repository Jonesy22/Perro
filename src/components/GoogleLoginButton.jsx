import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
// import { credentials } from '../config/client'



const GoogleLoginButton = (props) => {
    
    const clientID = "135401201253-5dd1qt8cqq3qh4h3jfnibkcclkrs8l2g.apps.googleusercontent.com";
    const clientSecret = "z4Hvx0y5lHI38vPDx9KOuVaM";

    let history = useHistory();

    const onSuccess = (res) => {
        // res returns object with information on account
        history.push('/tracking');
        var userProfile = res.getBasicProfile();
        props.setUserProfile(userProfile);
        console.log('Login success!:', props.userProfile);
        //props.sendData(userProfile);
    };

    const onFailure = (res) => {
        console.log('Login failed');
    };


    return (
        <div>
        <GoogleLogin
            clientId={clientID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{marginTop: '100px' }}
            //uxMode='redirect'
            //redirectUri='http://localhost:3000/tracking/'
            isSignedIn={true}
        />
    </div>
    )
}
export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(GoogleLoginButton);