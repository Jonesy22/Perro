import React from 'react';
import {useDispatch } from 'react-redux';
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import { getUserProfile } from "../data/selectors";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import {fetchTasks} from '../data/actions.jsx'





const GoogleLoginButton = (props) => {

    let history = useHistory();
    const dispatch = useDispatch();

    const onSuccess = async (res) => {
        // res returns object with information on account
        // console.log("res: ", res);
        var id_token = res.getAuthResponse().id_token;

        // history.push('/tracking');
        var userProfile = res.getBasicProfile();
        console.log(userProfile.token)

        console.log(userProfile)
        var newUserProfile = {
            id: userProfile.getId(),
            fullname: userProfile.getName(),
            email: userProfile.getEmail(),
            token: id_token,
            image: userProfile.getImageUrl()
        };

        console.log(newUserProfile)

        

        userProfile.token = id_token;
        props.setUserProfile(newUserProfile);

        const responseFromGoogle = await fetch("http://localhost:5000/api/v1/auth/google", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
            token: id_token
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "true"
          }
        });
        const data = await responseFromGoogle.json();
        if (data.error) throw new Error(data.error)
        
        console.log("data from user: ", data);
        
        dispatch(fetchTasks);

        console.log('Login success!:', userProfile);
        // console.log('Login success!:', props.userProfile);
        history.push('/tracking');

        // testing code, will send another request to /api/v1/auth/test to check if the sessionID is the same
        // const responseFromGoogle2 = await fetch("http://localhost:5000/api/v1/auth/test", {
        //     method: "POST",
        //     credentials: "include",
        //     body: JSON.stringify({
        //     token: id_token
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Headers": "true"
        //   }
        // });
        // const data2 = await responseFromGoogle2.json();
        // console.log(data2)
    };

    const onFailure = (res) => {
        console.log('Login failed');
    };


    return (
        <div>
        <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
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