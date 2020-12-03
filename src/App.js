import logo from './logo.svg';
import './App.css';
import 'react-bootstrap'
// components
import LeftProjectView from './components/LeftProjectView'
import RightProjectView from './components/RightProjectView'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  return (
    <div>
      <div className="float-container">
        <Header />
        <div className="float-child-left">
          <LeftProjectView />
        </div>
        <div className="float-child-right">
          <RightProjectView />
        </div>  
      </div>
      <Footer />
    </div>
  
  );
}

export default App;
