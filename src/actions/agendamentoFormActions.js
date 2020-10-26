export const SET_FIELD_AGENDAMENTO = 'SET_FIELD_AGENDAMENTO';
export const setFieldAgendamento = (field, value) => {
  return {
    type: SET_FIELD_AGENDAMENTO,
    field,
    value
  }
}

export const SET_ALL_FIELDS_AGENDAMENTO = 'SET_ALL_FIELDS_AGENDAMENTO';
export const setAllFieldsAgendamento = agendamento => ({
  type: SET_ALL_FIELDS_AGENDAMENTO,
  agendamento
})

export const RESET_FORM_AGENDAMENTO = 'RESET_FORM_AGENDAMENTO';
export const resetFormAgendamento = () => ({
  type: RESET_FORM_AGENDAMENTO
})