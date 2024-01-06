import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (enteredEmail, enteredPassword) => {
    if (enteredEmail === 'phuc@gmail.com' && enteredPassword === '123456') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      Alert.alert('Incorrect Email or Password');
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
    logoutUser,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };