import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_CARROS = 'SET_CARROS';
const setCarros = carros => ({
  type: SET_CARROS,
  carros
})

//create & update
export const createCarro = carro => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if (carro.id) {
      //update
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/carros/${carro.id}`)
        .set(carro);

    } else {
      //create
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/carros`)
        .push(carro);
    }
  }
}

//read
export const watchCarros = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/carros`)
      .on('value', snapshot => {
        const carros = snapshot.val()
        const action = setCarros(carros);
        dispatch(action);
      })
  }
}


//delete
export const deleteCarro = carro => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Exlusão",
        "Tem certeza que deseja excluir o carro",
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
                  .ref(`/users/${currentUser.uid}/carros/${carro.id}`)
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
