import { useEffect, useState } from 'react';
import './App.css';
import PinConfirmation from './components/pin/PinConfirmation';
import CustomStorage from './lib/CustomStorage';
import Key from './lib/Key';
import SignUp from './screens/SignUp';
import UserHome from './screens/UserHome';

function App() {
  const [hasPin, setHasPin] = useState<boolean>(false);
  const [isLoggedIn, setLoggedInStatus] = useState<boolean>(false);

  useEffect(() => {
      setHasPin(CustomStorage.hasKey(Key.PIN));
  }, [setHasPin]);

  const showSetupScreen = () => {
    return <SignUp onComplete={(hashed_pin) => {
      CustomStorage.setKeyValue(Key.PIN, hashed_pin);
      setHasPin(true);
      setLoggedInStatus(true);
    }}/>;
  }

  const showUserHomeScreen = () => {
    return <UserHome/>
  }

  const askForPinConfirmation = () => {
    return <PinConfirmation 
      onSuccess={() => setLoggedInStatus(true) } 
      onFailure={() => console.log("Unauthorized Access")}
    />
  }
  return (
      !hasPin ? showSetupScreen() : !isLoggedIn ? askForPinConfirmation() : showUserHomeScreen()
  );
}

export default App;
