export const SET_FIELD_RECIBO = 'SET_FIELD_RECIBO';
export const setFieldRecibo = (field, value) => {
  return {
    type: SET_FIELD_RECIBO,
    field,
    value
  }
}

export const SET_ALL_FIELDS_RECIBO = 'SET_ALL_FIELDS_RECIBO';
export const setAllFieldsRecibo = recibo => ({
  type: SET_ALL_FIELDS_RECIBO,
  recibo
})

export const RESET_FORM_RECIBO = 'RESET_FORM_RECIBO';
export const resetFormRecibo = () => ({
  type: RESET_FORM_RECIBO
})