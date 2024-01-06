import React from 'react';
import { AuthProvider } from './components/Context'
import AppNavigator from './components/AppNavigator'

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;


 