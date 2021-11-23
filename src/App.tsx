import './App.css';
import SignUp from './screens/SignUp';

function App() {
  return (
    <SignUp onComplete={(hashed_pin) => console.log(hashed_pin)}/>
  );
}

export default App;
