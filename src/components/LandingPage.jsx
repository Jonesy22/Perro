import React, {useState, useEffect } from 'react'
import '../App.css';
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import { withRouter } from "react-router-dom"
const { Content } = Layout

class LandingPage extends React.Component {

    
    render() {
        return (
            <div class="float-container">
                <Header />
                <div>
                    <h1 class="display-1 text-center">Welcome to Perro</h1>
                    <p class="mb-0 text-center">Perro: Simplify the Workflow</p>
                    <footer class="blockquote-footer text-center"><cite title="Source Title">Anonymous</cite></footer>
                </div>
                <Footer />
            </div>
        )
    }
}

// currently button only takes you to the tracking page without data pass. We will need to update this function later on...
const LoginButton = withRouter(({ history }) => (
    <button 
        type="button" 
        class="btn btn-primary" 
        onClick={() => { history.push('/auth/login')}}>
            Login
    </button>
))

export default LandingPage