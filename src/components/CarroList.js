import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemRow from './ItemRow';

const CarroList = (props) => {
  const { carros, onPressItem } = props;

  return (
    <View style={styles.container}>

      <FlatList
        data={carros}
        keyExtractor={carro => carro.id}
        renderItem={({ item: carro }) => (
          <View>
            <View style={styles.item}>
              <ItemRow label={'Apelido:'} content={carro.apelido} />

              <View style={styles.line}>
                <ItemRow label={'Marca:'} content={carro.marca} />
                <ItemRow label={'Modelo:'} content={carro.modelo} />
              </View>


              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => { alert(' Parte em Manutenção ') }}
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
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20
  },

  item: {
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginBottom: 16,
    elevation: 2,
  },

  img: {
    aspectRatio: 1,
    height: 80,
    borderRadius: 80 / 2,
    alignSelf: 'center',
    marginBottom: 10
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

export default CarroList;