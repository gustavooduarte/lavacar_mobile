import { SET_FIELD_RECIBO, SET_ALL_FIELDS_RECIBO, RESET_FORM_RECIBO } from '../actions';

const INITIAL_STATE = {
  id: null,
  assinado: false,
  endereco: "",
  cpf: "",
  data_emissao: "",
  nome: "",
  servico: "lavagem de carro",
  valor: "30"
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD_RECIBO:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    
    case SET_ALL_FIELDS_RECIBO:
      return action.recibo;

    case RESET_FORM_RECIBO:
      return INITIAL_STATE;

    default:
      return state;
  }
}