export const login = authentication => ({
  type: 'auth/login',
  payload: {authentication},
});

export const getCode = code => ({
  type: 'auth/code',
  payload: {code},
});

export const signup = authentication => ({
  type: 'auth/signup',
  payload: {authentication},
});
export const logout = () => ({type: 'auth/logout'});

export const saveToken = token => ({
  type: 'auth/saveToken',
  payload: {...token},
});

export const resetToken = () => ({type: 'auth/resetToken'});
