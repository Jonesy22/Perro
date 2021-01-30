import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";



const GoogleLogoutButton = () => {
    
    const clientID = "135401201253-5dd1qt8cqq3qh4h3jfnibkcclkrs8l2g.apps.googleusercontent.com";
    const clientSecret = "z4Hvx0y5lHI38vPDx9KOuVaM";

    let history = useHistory();

    // constructor(props) {
    //     super(props);
    //     this.state = { userProfile: {} };
    //     this.onSuccess = this.onSuccess.bind(this);
    //     this.onFailure = this.onFailure.bind(this);
    // }

    const logout = (res) => {
        // res returns object with information on account
        //var userProfile = res.getBasicProfile();
        //this.setState({userProfile: userProfile});
        //setUserProfile(userProfile);
        console.log('Logout success!:');
        history.push('/');
    };



    return (
        <div>
        <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            cookiePolicy={'single_host_origin'}
            style={{marginTop: '100px' }}
            // uxMode='redirect'
            // redirectUri='http://localhost:3000/'
        />
    </div>
    )
}
export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(GoogleLogoutButton);