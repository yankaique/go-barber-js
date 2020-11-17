import React from 'react';
import GlobalStle from './styles/global';

// import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <Signup />
      <GlobalStle />
    </>
  );
};

export default App;
