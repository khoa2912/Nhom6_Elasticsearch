import { authConstants } from "../action/constants";


const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  message: "",
};
export default (state = initState, action) => {
    switch (action.type) {
      case authConstants.LOGIN_REQUEST:
        state = {
          ...state,
          authenticating: true,
          error: null,
        };
        break;
      case authConstants.LOGIN_SUCCESS:
        state = {
          ...state,
          token: action.payload.token,
          user:action.payload.user,
          authenticating: false,
          authenticate:true,
        };
        break;
      case authConstants.LOGIN_FAILURE:
        state = {
          ...state,
          authenticating: false,
          error: action.payload.error,
        };
        break;
      case authConstants.LOGOUT_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case authConstants.LOGOUT_SUCCESS:
        state = {
          ...initState,
        };
      break;
    }
    return state;
}