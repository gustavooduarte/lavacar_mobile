import { combineReducers } from 'redux';
import agendamentoFormReducer from './agendamentoFormReducer';
import userReducer from './userReducer';
import agendamentoReducer from './agendamentoReducer';
import carroReducer from './carroReducer';
import carroFormReducer from './carroFormReducer';
import reciboReducer from './reciboReducer';
import reciboFormReducer from './reciboFormReducer';

export default combineReducers({
  user: userReducer,
  agendamentoForm: agendamentoFormReducer,
  agendamentosList: agendamentoReducer,
  carrosList: carroReducer,
  carroForm: carroFormReducer,
  recibosList: reciboReducer,
  reciboForm: reciboFormReducer,
});