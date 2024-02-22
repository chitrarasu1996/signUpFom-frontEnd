
import './App.css';
import SignupForm from './components/SignupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Toaster/>
    <SignupForm/>
    </div>
  );
}

export default App;
