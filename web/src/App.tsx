import React from 'react';
import GlobalStle from './styles/global';

import Signin from './pages/Signin';
// import Signup from './pages/Signup';

import AuthContext from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{ name: 'Yan' }}>
        <Signin />
      </AuthContext.Provider>
      <GlobalStle />
    </>
  );
};

export default App;
