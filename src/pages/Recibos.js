import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReciboList from '../components/ReciboList'

export default class Recibos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recibos: [
        { id: '2', nome: 'José', cpf: '12345678910', servico: 'lavagem de carro', data_emissao: '31/08/2020', valor: 30.00, cidade: 'Cornélio Procópio - PR', assinado: false },
        { id: '1', nome: 'José', cpf: '12345678910', servico: 'lavagem de carro', data_emissao: '31/08/2020', valor: 30.00, cidade: 'Cornélio Procópio - PR', assinado: true },
      ]
    }
  }

  render() {
    return (
      <View>
        <View >
          <ReciboList
            recibos={this.state.recibos}
            onPressItem={(parameters) => this.props.navigation.navigate('ReciboDetail', parameters)} />
        </View>
      </View>
    );
  }
}
