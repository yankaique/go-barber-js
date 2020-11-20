import React from 'react';
import GlobalStle from './styles/global';

import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import { AuthProvider } from './hooks/AuthContext';
import ToastContainer from './components/toastContainer/index';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>
      <ToastContainer />
      <GlobalStle />
    </>
  );
};

export default App;
