import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import PerfilInfo from '../components/PerfilInfo'

export default class Perfil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perfil: {},
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?nat=br&results=1')
      .then(response => {
        const { results } = response.data;
        this.setState({
          perfil: results[0],
          loading: false
        })
      }).catch(error => {
        this.state({
          error: true,
          loading: false,
        })
      })
  }

  render() {
    return (
      <View>
        {
          this.state.loading ?
            <View style = {styles.loading}>
              <ActivityIndicator size={150} color='#00AFEF'/>
            </View>
          :
            this.state.error ?
              <Text style = {styles.error}>Não foi possivel carregar as informações da conta... Tente novamente, mais tarde</Text>
            :
              <PerfilInfo perfil={this.state.perfil} onPressButtonExit={() => this.props.navigation.navigate('Login')}/>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignContent: 'center'
  },
  error: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center'
  }
})