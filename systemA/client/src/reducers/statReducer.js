import { SET_DATA } from "../actions/actionType.js";
const initialState = {
  loading: false,
  msg: "",
  stats:{},
  randomArr:[],
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATA: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload.value;
      return newState;
    }
    default:
      return state;
  }
}
