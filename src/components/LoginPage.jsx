import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import { setUserProfile } from '../data/actions'
import { getUserProfile } from "../data/selectors";
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";



class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userProfile: {} };
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input type="email" class="form-control form-control-lg w-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control form-control-lg w-50 center" id="exampleInputPassword1" placeholder="Password"></input>
                        </div>
                    </form>
                    <GoogleLoginButton />
                    <GoogleLogoutButton />
                </div>
                
                <Footer />
            </div>
        )
    }
}

// currently button only takes you to the tracking page without data pass. We will need to update this function later on...
/* const LoginButton = withRouter(({ history }) => (
    <button 
        type="button" 
        class="btn btn-primary" 
        onClick={() => { history.push('/tracking')}}>
            Login
    </button>
)) */

// var userProfile = "";
/* const clientID = "135401201253-5dd1qt8cqq3qh4h3jfnibkcclkrs8l2g.apps.googleusercontent.com";
const clientSecret = "z4Hvx0y5lHI38vPDx9KOuVaM"; */

// const GoogleLoginButton = () => {

    
//     const onSuccess = (res) => {
//         // res returns object with information on account
//         var userProfile = res.getBasicProfile();
//         this.props.setUserProfile(userProfile);
//         console.log('Login success!:', userProfile);
//         //this.history.push('/tracking');
//         console.log('SUCCESSS!!!!');
//     };

//     const onFailure = (res) => {
//         console.log('Login failed');
//     };

//     return (
//         <div>
//             <GoogleLogin
//                 clientId={clientID}
//                 buttonText="Login"
//                 onSuccess={onSuccess}
//                 onFailure={onFailure}
//                 cookiePolicy={'single_host_origin'}
//                 style={{marginTop: '100px' }}
//                 uxMode='redirect'
//                 redirectUri='http://localhost:3000/tracking/'
//                 isSignedIn={true}
//             />
//         </div>
//     )
// }

// const GoogleLogoutButton = () => {
//     const onSuccess = () => {
//         console.log('Logout success!');
//     };

//     return (
//         <div>
//             <GoogleLogin
//                 clientId={clientID}
//                 buttonText="Logout"
//                 onLogoutSuccess={onSuccess}
//                 style={{marginTop: '100px' }}
//                 isSignedIn={false}
//             />
//         </div>
//     )
// }

export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(LoginPage);