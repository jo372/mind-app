import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import CustomRoutes from './lib/CustomRoutes';
import CustomStorage from './lib/CustomStorage';
import Key from './lib/Key';

function App() {
  const navigate = useNavigate();
  
  // when the application has initial loaded, we'll check if the user has a key or not.
  useEffect(() => {
    const { 
      REGISTER, 
      LOGIN
    } = CustomRoutes;

    const showSetupScreen = () => navigate(REGISTER);
    const showLoginScreen = () => navigate(LOGIN);
    
    CustomStorage.setKeyValue(Key.AUTHENTICATED, "false");
    const hasPin = CustomStorage.hasKey(Key.PIN);

    !hasPin ? showSetupScreen() : showLoginScreen()
  });

  return null;
}

export default App;
