import React from 'react'
import Header from './Header'
import Footer from './Footer'

class LandingPage extends React.Component {

    
    render() {
        return (
            <div>
                <Header />
                <div>
                    <h1 className="display-1 text-center">Welcome to Perro</h1>
                    <p className="mb-0 text-center">Perro: Simplify the Workflow</p>
                    <footer className="blockquote-footer text-center"><cite title="Source Title">Anonymous</cite></footer>
                </div>
                <Footer />
            </div>
        )
    }
}

export default LandingPage