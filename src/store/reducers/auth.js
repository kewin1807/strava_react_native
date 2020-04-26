const initState = {
  access_token: null,
  refresh_token: null,
  code: null,
};

export default (state = initState, {type, payload}) => {
  switch (type) {
    case 'auth/saveToken':
      return {...state, ...payload};
    case 'auth/code':
      return {...state, code: payload.code};
    default:
      return state;
  }
};
