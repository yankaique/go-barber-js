import React from 'react';
import GlobalStle from './styles/global';

import Signin from './pages/Signin';

const App: React.FC = () => {
  return (
    <>
      <Signin />
      <GlobalStle />
    </>
  );
};

export default App;
