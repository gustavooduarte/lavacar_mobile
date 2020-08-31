import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AgendamentoList from '../components/AgendamentoList'

export default class Agenda extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agendamentos: [
        { id: '3', servico: 'lavagem', status: 'aguardando', data: '31/08/2020', horario: '15:00h', valor: 30.00, carro: 'Fiat Fire', forma_pagamento: 'Dinheiro', endereco: 'Avenida Alberto Carazzai, 16640, Cornélio Procópio - PR' },
        { id: '2', servico: 'lavagem', status: 'confirmado', data: '31/08/2020', horario: '15:00h', valor: 30.00, carro: 'Jeep Renegate', forma_pagamento: 'Dinheiro', endereco: 'Avenida Alberto Carazzai, 16640, Cornélio Procópio - PR' },
        { id: '1', servico: 'lavagem', status: 'cancelado', data: '10/09/2019', horario: '13:30h', valor: 30.00, carro: 'Jeep Renegate', forma_pagamento: 'Cartão', endereco: 'Avenida Alberto Carazzai, 16640, Cornélio Procópio - PR' },
      ]
    }
  }

  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}> Histórico de Agendamentos </Text>
        </View>

        <View style={styles.container}>
          <AgendamentoList
            agendamentos={this.state.agendamentos}
            onPressItem={(parameters) => this.props.navigation.navigate('AgendamentoDetail', parameters)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  title: {
    padding: 5,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 3,
    borderBottomWidth: 4,
    borderBottomColor: "#00AFEF",
    width: 250,
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 16,
    color: "#00AFEF",
    fontWeight: 'bold',
  }
});