import { createContext, useContext } from 'react';
import type { AuthState, AuthAction } from '../types/data-types';

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
};

type AuthContextValue = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextValue>({
  state: initialState,
  dispatch: () => null,
});

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
