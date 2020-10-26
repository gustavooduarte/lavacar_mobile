import { SET_AGENDAMENTOS } from '../actions';

export default function (state = null, action) {
  switch(action.type){
    case SET_AGENDAMENTOS:
      return action.agendamentos;
    default:
      return state;
  }
}