import './App.css';
import PinInput from './components/pin/PinInput';

function App() {
  return (
    <PinInput onSubmit={(val: string) => console.log(val)}/>
  );
}

export default App;
