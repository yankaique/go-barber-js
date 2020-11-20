import React from 'react';
import GlobalStle from './styles/global';

import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>
      <GlobalStle />
    </>
  );
};

export default App;
