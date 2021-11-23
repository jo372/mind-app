import { useEffect, useState } from 'react';
import './App.css';
import CustomStorage from './lib/CustomStorage';
import Key from './lib/Key';
import SignUp from './screens/SignUp';

function App() {
  const [hasPin, setHasPin] = useState<boolean>(false);

  useEffect(() => {
      setHasPin(CustomStorage.hasKey(Key.PIN));
  }, [setHasPin]);

  const showSetupScreen = () => {
    return <SignUp onComplete={(hashed_pin) => {
      CustomStorage.setKeyValue(Key.PIN, hashed_pin);
      setHasPin(true);
    }}/>;
  }

  const showUserHomeScreen = () => {
    return <p>Successfully registered :)</p>;
  }
  return (
      !hasPin ? showSetupScreen() : showUserHomeScreen()
  );
}

export default App;
