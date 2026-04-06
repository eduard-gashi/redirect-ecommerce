import React, { useReducer, useEffect, ReactNode } from 'react';
import type { AuthState, AuthAction } from '../types/data-types';
import { AuthContext } from './AuthContext';

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'USER_SIGNIN':
      console.log('Reducer USER_SIGNIN aufgerufen mit payload:', action.payload);
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  }, [state.userInfo]);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
