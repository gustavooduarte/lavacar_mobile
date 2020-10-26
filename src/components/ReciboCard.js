import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemRow from './ItemRow';

const ReciboList = (props) => {
  const { recibo, onPressItem } = props;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.line}>
          <Text style={styles.recibo} >Recibo</Text>
          <Text style={[styles.idRecibo, recibo.id.length > 5 ? styles.longID : null]}>ID {recibo.id}</Text>
        </View>
        <ItemRow label={'Nome:'} content={recibo.nome} />

        <ItemRow label={'Serviço:'} content={recibo.servico} />
        <ItemRow label={'Data de Emisão:'} content={recibo.data_emissao} />

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
    paddingHorizontal: 20,
    marginBottom: 10
  },
  item: {
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginBottom: 16,
    elevation: 2,
  },

  statusText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    marginBottom: 20
  },

  recibo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },

  idRecibo: {
    fontSize: 20,
    color: "#808080"
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
  },
  longID: {
    fontSize: 14,
    alignSelf: 'center'
  }
})

export default ReciboList;