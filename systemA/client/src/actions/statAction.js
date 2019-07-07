import { SET_DATA } from "./actionType";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export function setData(id,value) {
  return dispatch => {
    dispatch({
      type: SET_DATA,
      payload: {
        id,value
      }
    });
  };
}

export const calcStats = p => dispatch => {
  axios //validating payload,if valid->call calculate-stats, else return
    .get(baseUrl + "/actions", {
      params: {
        method: "IS-VALID-ENTRY",
        payload: p.payload,
        ts: p.ts
      }
    })
    .then(resp => {
      axios //calculating statistics..
        .get(baseUrl + "/actions", {
          params: {
            method: "CALCULATE-STATS",
            payload: p.payload,
            ts: p.ts
          }
        })
        .then(res => {
          dispatch(setData("stats",res.data));
        })
        .catch(err =>
          dispatch(setData("msg","Server not running on port 9090!"))
        )
    })
    .catch(err =>
      dispatch(setData("msg","All the input values should be integer and the list should contain atleast 2 numbers"))
    );
    setTimeout(()=>dispatch(setData("msg","")),10000);
};

export const genRand = p => dispatch=>{
  dispatch(setData("stats",{}));
  dispatch(setData("msg",""));
  return axios //generating random numbers->RPC call
    .get(baseUrl + "/actions", {
      params: {
        method: "GEN-RAND",
        ts: p.ts
      }
    })
}