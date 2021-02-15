import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import { setUserProfile } from '../data/actions';
import { connect } from 'react-redux';
import React from 'react';
import { getUserProfile } from "../data/selectors";




const Header = (props) => {

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Perro</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <GoogleLoginButton/>
                <GoogleLogoutButton/>
            </form>
            </div>
        </nav>
    );
}

export default connect(
    state => ({ userProfile: getUserProfile(state) }),
    { setUserProfile }
  )(Header);