const initState = {
  profileReference: null,
};

export default (state = initState, {type, payload}) => {
  switch (type) {
    case 'profile/saveProfile':
      return {...state, ...payload};
    default:
      return initState;
  }
};
