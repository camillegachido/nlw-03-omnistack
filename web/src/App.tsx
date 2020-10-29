import React, { useState } from 'react';
import Routes from './routes'
import {AuthProvider} from './contexts/auth'

function App() {
  const [signed, setSigned] = useState(false)

  function sigIn(){
    //const response = api.sigIn

    setSigned(true)
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
