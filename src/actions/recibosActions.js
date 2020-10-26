import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_RECIBOS = 'SET_RECIBOS';
const setRecibos = recibos => ({
  type: SET_RECIBOS,
  recibos
})

//create & update
export const createRecibo = recibo => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (recibo.id) {
      //update
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/recibos/${recibo.id}`)
        .set(recibo);

    } else {
      //create
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/recibos`)
        .push(recibo);
    }
  }
}

//read
export const watchRecibos = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/recibos`)
      .on('value', snapshot => {
        const recibos = snapshot.val()
        const action = setRecibos(recibos);
        dispatch(action);
      })
  }
}


//delete
export const deleteRecibo = recibo => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Exlusão",
        "Tem certeza que deseja excluir o recibos",
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
                  .ref(`/users/${currentUser.uid}/recibos/${recibo.id}`)
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
