import React, { createContext, useReducer, useEffect, ReactNode } from 'react';


interface UserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthState {
  userInfo: UserInfo | null;
}

type AuthAction =
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' };


  const initialState: AuthState = {

    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
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


export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  }, [state.userInfo]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};