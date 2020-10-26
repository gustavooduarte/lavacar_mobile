import { SET_FIELD_CARRO, SET_ALL_FIELDS_CARRO, RESET_FORM_CARRO } from '../actions';

const INITIAL_STATE = {
  id: null,
  apelido: "",
  img: "",
  marca: "",
  modelo: "",
  tamanho: "",
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD_CARRO:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    
    case SET_ALL_FIELDS_CARRO:
      return action.carro;

    case RESET_FORM_CARRO:
      return INITIAL_STATE;

    default:
      return state;
  }
}