import { SET_CARROS } from '../actions';

export default function (state = null, action) {
  switch(action.type){
    case SET_CARROS:
      return action.carros;
    default:
      return state;
  }
}