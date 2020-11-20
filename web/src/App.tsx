import React from 'react';
import GlobalStle from './styles/global';

import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import AppProvider from './hooks/index';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Signin />
      </AppProvider>
      <GlobalStle />
    </>
  );
};

export default App;
