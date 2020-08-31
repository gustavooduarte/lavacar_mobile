import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Line from '../components/Line'


export default class AgendamentoDetail extends React.Component {
  render() {

    const { agendamento } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.calendarIcon}>
          <Icon name={'calendar-text'} size={75} color='#808080' />
        </View>
        <Line label={"Id:"} content={agendamento.id} />
        <Line label={"Status:"} content={agendamento.status} />
        <Line label={"Data:"} content={agendamento.data} />
        <Line label={"Horário:"} content={agendamento.horario} />
        <Line label={"Carro:"} content={agendamento.carro} />
        <Line label={"Valor:"} content={agendamento.valor} />
        <Line label={"Pagamento:"} content={agendamento.forma_pagamento} />
        <Line label={"Endereço:"} content={agendamento.endereco} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  calendarIcon: {
    alignSelf: 'center',
    padding: 20,
  }
});