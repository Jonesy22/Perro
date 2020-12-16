import React, {useState, useEffect } from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import { withRouter } from "react-router-dom"
const { Content } = Layout

class LandingPage extends React.Component {





    render() {
        return (
            <div>
                <div>
                    <h1 class="display-1 text-center">Welcome to Perro</h1>
                    <p class="mb-0 text-center">Perro: Simplify the Workflow</p>
                    <footer class="blockquote-footer text-center"><cite title="Source Title">Anonymous</cite></footer>
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
                    <LoginButton />
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
        onClick={() => { history.push('/tracking')}}>
            Login
    </button>
))

export default LandingPage