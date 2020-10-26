import { SET_FIELD_AGENDAMENTO, SET_ALL_FIELDS_AGENDAMENTO, RESET_FORM_AGENDAMENTO } from '../actions';

const INITIAL_STATE = {
  id: null,
  servico: 'lavagem',
  status: 'aguardando',
  data: '',
  horario: '8:00h',
  valor: "30",
  carro: '',
  forma_pagamento: 'dinheiro',
  endereco: '',
  observacoes: ''
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD_AGENDAMENTO:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    
    case SET_ALL_FIELDS_AGENDAMENTO:
      return action.agendamento;

    case RESET_FORM_AGENDAMENTO:
      return INITIAL_STATE;

    default:
      return state;
  }
}