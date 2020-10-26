import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_AGENDAMENTOS = 'SET_AGENDAMENTOS';
const setAgendamentos = agendamentos => ({
  type: SET_AGENDAMENTOS,
  agendamentos
})

//create & update
export const createAgendamento = agendamento => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (agendamento.id) {
      //update
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/agendamentos/${agendamento.id}`)
        .set(agendamento);

    } else {
      //create
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/agendamentos`)
        .push(agendamento);
    }
  }
}

//read
export const watchAgendamentos = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/agendamentos`)
      .on('value', snapshot => {
        const agendamentos = snapshot.val()
        const action = setAgendamentos(agendamentos);
        dispatch(action);
      })
  }
}


//delete
export const deleteAgendamento = agendamento => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Exlusão",
        "Tem certeza que deseja excluir o agendamento",
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel'
        },{
            text: 'Sim',
            onPress: async () => {
              const { currentUser } = firebase.auth();

              try{
                await firebase
                  .database()
                  .ref(`/users/${currentUser.uid}/agendamentos/${agendamento.id}`)
                  .remove();

                resolve(true);
              }catch (error) {
                reject(error);
              }
            },
            style: 'cancel'
        }],
        { cancelable:false }
      )
    })
  }
}
