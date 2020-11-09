import logo from './logo.svg';
import './App.css';

// components
import LeftProjectView from './components/LeftProjectView'
import RightProjectView from './components/RightProjectView'

function App() {
  return (
    <div>
      <RightProjectView></RightProjectView>
      <LeftProjectView></LeftProjectView>
    </div>
  );
}

export default App;
