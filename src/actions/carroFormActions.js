export const SET_FIELD_CARRO = 'SET_FIELD_CARRO';
export const setFieldCarro = (field, value) => {
  return {
    type: SET_FIELD_CARRO,
    field,
    value
  }
}

export const SET_ALL_FIELDS_CARRO = 'SET_ALL_FIELDS_CARRO';
export const setAllFieldsCarro = carro => ({
  type: SET_ALL_FIELDS_CARRO,
  carro
})

export const RESET_FORM_CARRO = 'RESET_FORM_CARRO';
export const resetFormCarro = () => ({
  type: RESET_FORM_CARRO
})