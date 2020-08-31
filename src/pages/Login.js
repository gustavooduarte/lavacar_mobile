import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component {
  processLogin() {
    this.props.navigation.navigate('Home')
  }

  processRegister() {
    console.log('Register OK');
  }

  render() {
    return (
      <View style={styles.container}>

        <Image source={require('../assets/Logo_LAVACAR.png')} style={styles.logo} />

        <FormRow>
          <Text>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite seu e-mail"
          />
        </FormRow>

        <FormRow>
          <Text>Senha:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
        </FormRow>

        <FormRow>
          <TouchableOpacity style={styles.btnLogin} onPress={() => this.processLogin()}>
            <Text style={styles.textLogin}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.register} onPress={() => this.processRegister()}>
            <Text>Não possui conta?</Text>
            <Text style={styles.textRegister}> Cadastre-se aqui</Text>
          </TouchableOpacity>
        </FormRow>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },

  logo: {
    marginBottom: 20,
    alignSelf: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnLogin: {
    backgroundColor: '#00AFEF',
    width: '100%',
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLogin: {
    color: '#FFF'
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textRegister: {
    color: '#00AFEF'
  }
});