import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CarroList from '../components/CarroList'

export default class MeuCarro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carros: [
        { id: '1', apelido: 'Carro 1', marca: 'Fiat', modelo: 'Fire', tamanho: 'Pequeno', image: '../assets/carros/fiat_fire.jpg'  },
        { id: '2', apelido: 'Carro 2', marca: 'Jeep', modelo: 'Renegate', tamanho: 'Médio', image: '../assets/carros/jeep_renegate.jpg' },
      ]
    }
  }

  render() {
    return (
      <View>
          <CarroList
            carros={this.state.carros}
            onPressItem={(parameters) => this.props.navigation.navigate('MeuCarroDetail', parameters)} />
      </View>
    );
  }
}