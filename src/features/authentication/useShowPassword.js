export const initialState = {
  password: false,
  confirmPassword: false,
};

export function toggleReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PASSWORD":
      return { ...state, password: !state.password };
    case "TOGGLE_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: !state.confirmPassword };
    default:
      return state;
  }
}
