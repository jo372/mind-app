import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserHomeScreen from './screens/UserHome';
import SignUpScreen from './screens/SignUp';
import UnAuthorizedAccessScreen from './screens/UnauthorizedAccess';
import ShowLogEntriesScreen from './screens/ShowLogEntries';
import AddLogEntryScreen from './screens/AddLogEntry';
import CustomRoutes from './lib/CustomRoutes';
import LoginScreen from './screens/LoginScreen';
import LogoutScreen from './screens/LogoutScreen';

const Routing = () => {
  const { 
    REGISTER, 
    UNAUTHORIZED, 
    LOGIN,
    HOME, 
    SHOW_LOGS, 
    ADD_LOG_ENTRY,
    LOGOUT
  } = CustomRoutes;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path={REGISTER} element={<SignUpScreen/>} />
        <Route path={LOGIN} element={<LoginScreen/>}/ >
        <Route path={UNAUTHORIZED} element={<UnAuthorizedAccessScreen/>} />
        <Route path={HOME} element={<UserHomeScreen/>} />
        <Route path={SHOW_LOGS} element={<ShowLogEntriesScreen/>} />
        <Route path={ADD_LOG_ENTRY} element={<AddLogEntryScreen/>} />
        <Route path={LOGOUT} element={<LogoutScreen/>} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Routing/>, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
