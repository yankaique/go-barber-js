import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStle from './styles/global';

import Routes from './routes';

import AppProvider from './hooks/index';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStle />
    </Router>
  );
};

export default App;
