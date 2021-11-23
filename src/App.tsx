import { useEffect, useState } from 'react';
import './App.css';
import PinConfirmation from './components/pin/PinConfirmation';
import CustomStorage from './lib/CustomStorage';
import Key from './lib/Key';
import SignUpScreen from './screens/SignUp';
import UnAuthorizedAccessScreen from './screens/UnauthorizedAccess';
import UserHomeScreen from './screens/UserHome';

function App() {
  const [hasPin, setHasPin] = useState<boolean>(false);
  const [authorized, setAuthorizedStatus] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
      setHasPin(CustomStorage.hasKey(Key.PIN));
  }, [setHasPin]);

  const showSetupScreen = () => {
    return <SignUpScreen onComplete={(hashed_pin) => {
      CustomStorage.setKeyValue(Key.PIN, hashed_pin);
      setHasPin(true);
      setAuthorizedStatus(true);
    }}/>;
  }

  const showUserHomeScreen = () => {
    return <UserHomeScreen/>
  }

  const resetToDefault = () => {
    setAuthorizedStatus(false);
    setError(false);
  }

  const showUnauthorizedAccessScreen = () => {
    return <UnAuthorizedAccessScreen onClick={resetToDefault}/>
  }

  const askForPinConfirmation = () => {
    return <PinConfirmation onSuccess={() => setAuthorizedStatus(true) } onFailure={() => { setError(true)}}/>
  }

  if(!hasPin) return showSetupScreen();
  if(!authorized && !error) {
    return askForPinConfirmation();
  } else if(!authorized && error) {
    return showUnauthorizedAccessScreen();
  }

  return showUserHomeScreen();
}

export default App;
