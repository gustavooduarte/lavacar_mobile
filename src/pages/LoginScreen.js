import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Keyboard } from 'react-native';
import firebase from 'firebase';
import FormRow from '../components/FormRow';

import { connect } from 'react-redux';

import { processLogin } from '../actions';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    }
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyDRSjITc75sQnLkgMhiU_6sl5hmg7PA45A",
      authDomain: "lavacar-3ab9c.firebaseapp.com",
      databaseURL: "https://lavacar-3ab9c.firebaseio.com",
      projectId: "lavacar-3ab9c",
      storageBucket: "lavacar-3ab9c.appspot.com",
      messagingSenderId: "192714036939",
      appId: "1:192714036939:web:e3f881fadf7acf2bce6d4e",
      measurementId: "G-1RR7SXK8V7"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor
    })
  }

  processLogin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;

    this.props.processLogin({email, password})
      .then( user => {
        if(user){
          this.props.navigation.replace('Home');
        } else {
          this.setState({
            isLoading: false,
            message: ''
          })
        }
      })
      .catch( error => {

        this.setState({ 
          isLoading: false,
          message: this.getMessageByError(error.code)}); 
      });
  }

  getMessageByError(code) {
    switch (code) {
      case 'auth/user-not-found':
        return "E-mail inexistente.";
      case 'auth/wrong-password':
        return "Senha Incorreta.";
      default:
        return "Erro Desconhecido.";
    }
  }

  processRegister() {
    console.log('Register OK');
  }

  renderMessage() {
    const { message } = this.state;

    if (!message) {
      return null;
    }

    return (
      <View>
        <Text>{message}</Text>
      </View>
    )
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator color='#00AFEF' />

    return (
      <FormRow>
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.processLogin()}>
          <Text style={styles.textLogin}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.register} onPress={() => this.processRegister()}>
          <Text>Não possui conta?</Text>
          <Text style={styles.textRegister}> Cadastre-se aqui</Text>
        </TouchableOpacity>
      </FormRow>
    )
  }


  render() {
    return (
      <View style={styles.container}>

        <Image source={require('../assets/Logo_LAVACAR.png')} style={styles.logo} />

        <FormRow>
          <Text>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite seu e-mail..."
            value={this.state.email}
            onChangeText={valor => { this.onChangeHandler('email', valor)}}
            keyboardType = 'email-address'
            autoCapitalize = 'none'
          />
        </FormRow>

        <FormRow>
          <Text>Senha:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua senha..."
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={valor => { this.onChangeHandler('password', valor) }}
          />
        </FormRow>

        { this.renderMessage()}

        { this.renderButton()}



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

export default connect(null , {processLogin})(LoginScreen);