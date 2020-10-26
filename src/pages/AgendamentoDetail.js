import React from 'react';
import { View, StyleSheet, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Line from '../components/Line'
import LongText from '../components/LongText'

import { connect } from 'react-redux';
import { deleteAgendamento }from '../actions';
import { STATUS_REALIZADO } from '../utils';

class AgendamentoDetail extends React.Component {

  renderBtnRecibo(){
    const { agendamento } = this.props.route.params;
    const recibo = {
      id: null,
      assinado: false,
      endereco: agendamento.endereco,
      cpf: "",
      data_emissao: agendamento.data,
      nome: "",
      servico: "lavagem de carro",
      valor: agendamento.valor
    }

    if(agendamento.status == STATUS_REALIZADO){

      return (
        <View>
          <TouchableOpacity
            style={styles.btnEmitirRecibo}
            onPress={() => {
              console.log(recibo.data_emissao)
              this.props.navigation.navigate('ReciboForm', { reciboToEdit: recibo });
            }}
          >
            <Icon name={'border-color'} color='#888' size={30} />
          </TouchableOpacity>
          <Text style={styles.textEmitirRecibo}>Criar Recibo</Text>
        </View>
      )
    }
  }

  render() {

    const { agendamento } = this.props.route.params;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.calendarIcon}>
            <Icon name={'calendar-text'} size={70} color='#808080' />
          </View>
          <Line label={"Status"} content={agendamento.status} />
          <Line label={"Data"} content={agendamento.data} />
          <Line label={"Horário"} content={agendamento.horario} />
          <Line label={"Carro"} content={agendamento.carro} />
          <Line label={"Valor"} content={agendamento.valor} />
          <Line label={"Pagamento"} content={agendamento.forma_pagamento} />
          <Line label={"Endereço"} content={agendamento.endereco} />
          <LongText label={"Observações"} content={agendamento.observacoes} />

          <View style = {styles.opcoes}>
            <View style={styles.button}>
              <Button
                color='#00AFEF'
                title='Editar'
                onPress={() => {
                  this.props.navigation.replace('AgendamentoForm', { agendamentoToEdit: agendamento });
                }}
              />
            </View>

            <View style={styles.button}>
              <Button
                color='#FF6961'
                title='Excluir'
                onPress={ async () => {
                  const hasDeleted = await this.props.deleteAgendamento(agendamento);

                  if(hasDeleted) {
                    this.props.navigation.goBack();
                  }

                }}
              />
            </View>
          </View>
        </View>

        { this.renderBtnRecibo() }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  opcoes:{
    flexDirection: 'row'
  },
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  calendarIcon: {
    alignSelf: 'center',
    padding: 20,
  },
  button: {
    margin: 4,
    flex: 2
  },
  btnEmitirRecibo: {
    backgroundColor: '#FFF',
    elevation: 3,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 100
  },
  textEmitirRecibo: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default connect(null, {deleteAgendamento})(AgendamentoDetail);