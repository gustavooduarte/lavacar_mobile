import React from 'react';
import { LogBox } from 'react-native';
import LavacarApp from './src/LavacarApp'

//Disable yellow box (Versão atual)
// Ignore log notification by message:
LogBox.ignoreAllLogs();


function App() {
  return (
    <LavacarApp />
  );
}

export default App;