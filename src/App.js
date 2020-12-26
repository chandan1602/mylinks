import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './screens/login'
import Signup from './screens/signup'
import ForgotPassword from './screens/forgotpassword'
import Home from './screens/home'
import Attendance from './screens/attendance'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/home" component={Home} />
      <Route path="/attendance" component={Attendance} />
    </Router>
    );
}

export default App;
