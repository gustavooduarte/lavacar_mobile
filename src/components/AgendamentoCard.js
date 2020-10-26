import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemRow from './ItemRow';

const AgendamentoList = (props) => {
  const { agendamento, onPressItem } = props;

  const statusColor = (parameters) => {
    let cor;

    switch(parameters){
      case 'confirmado':
        cor = '#08DB00'
        break;
      case 'aguardando':
        cor = '#FC9F35'
        break;
      case 'cancelado':
        cor = '#FC3535'
        break;
      case 'realizado':
        cor = '#00AFEF'
      default:
        cor = 'gray'
    }

    return cor
  }

  return (
    <View style={styles.container}>
      <View style={[styles.agendamentoStatus, { backgroundColor: statusColor(agendamento.status) }]}>
        <Text style={styles.statusText}>{agendamento.status}</Text>
      </View>
      <View style={styles.item}>
        <View style={styles.line}>
          <ItemRow label={'Data:'} content={agendamento.data} />
          <ItemRow label={'Horario:'} content={agendamento.horario} />
        </View>
        <ItemRow label={'Valor:'} content={agendamento.valor} />

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => { onPressItem(); }}
        >
          <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
          <Icon name="arrow-right-thick" size={16} color="#00AFEF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },

  item: {
    padding: 20,
    paddingHorizontal: 40,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#FFF',
    marginBottom: 16,
    elevation: 2,
  },

  agendamentoStatus: {
    height: 30,
    backgroundColor: '#FC3535',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    justifyContent: 'center'
  },

  statusText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  line: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsButtonText: {
    color: '#00AFEF',
    fontSize: 15,
    fontWeight: 'bold',
  }
})

export default AgendamentoList;