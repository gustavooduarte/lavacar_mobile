import { SET_RECIBOS } from '../actions';

export default function (state = null, action) {
  switch(action.type){
    case SET_RECIBOS:
      return action.recibos;
    default:
      return state;
  }
}