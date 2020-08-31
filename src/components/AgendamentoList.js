import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemRow from './ItemRow';

const AgendamentoList = (props) => {
  const { agendamentos, onPressItem } = props;

  const statusColor = (parameters) => {
    let cor;
    if (parameters === 'confirmado') {
      cor = '#08DB00'
    } else if (parameters === 'aguardando') {
      cor = '#FC9F35'
    } else if (parameters === 'cancelado') {
      cor = '#FC3535'
    }
    return cor
  }

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.list}
        data={agendamentos}
        keyExtractor={agendamento => agendamento.id}
        renderItem={({ item: agendamento }) => (
          <View>
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
                onPress={() => { onPressItem({ agendamento }); }}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Icon name="arrow-right-thick" size={16} color="#00AFEF" />
              </TouchableOpacity>
            </View>
          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },

  list: {
    marginBottom: 10,
  },

  item: {
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginBottom: 16,
    elevation: 2,
  },

  agendamentoStatus: {
    height: 30,
    backgroundColor: '#FC3535',
    alignItems: 'center',
    borderRadius: 5,
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