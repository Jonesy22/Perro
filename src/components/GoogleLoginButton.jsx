import React, {useState, useEffect } from 'react';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogin } from 'react-google-login';



class GoogleLoginButton extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { userProfile: {} };
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess(res) {
        // res returns object with information on account
        var userProfile = res.getBasicProfile();
        this.setState({userProfile: userProfile});
        this.props.setUserProfile(userProfile);
        console.log('Login success!:', userProfile);
    };

    onFailure(res) {
        console.log('Login failed');
    };


    render() {
        const clientID = "135401201253-5dd1qt8cqq3qh4h3jfnibkcclkrs8l2g.apps.googleusercontent.com";
        const clientSecret = "z4Hvx0y5lHI38vPDx9KOuVaM";

        return (
            <div>
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px' }}
                uxMode='redirect'
                redirectUri='http://localhost:3000/tracking/'
                isSignedIn={true}
            />
        </div>
        )
    }
}
export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(GoogleLoginButton);