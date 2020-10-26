import React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import CarroCard from '../components/CarroCard'

import { connect } from 'react-redux';

import { watchCarros } from '../actions'

class MeuCarro extends React.Component {
  componentDidMount(){
    this.props.watchCarros();
  }

  render() {
    if (this.props.carros == null) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={150} color='#00AFEF' />
        </View>
      )
    }

    return (
      <View>
        <FlatList
          style={styles.list}
          data={this.props.carros}
          keyExtractor={carro => carro.id}
          renderItem={({ item: carro }) => (
          <CarroCard
            carro={carro}
            onPressItem={() => this.props.navigation.navigate('MeuCarroDetail', { carro })} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignContent: 'center'
  },
  list: {
    paddingTop: 20,
    marginBottom: 30,
  },
});

const mapStateToProps = state => {
  const { carrosList } = state;

  if (carrosList == null) {
    return { carros: carrosList };
  }

  const keys = Object.keys(carrosList)
  const carrosListWithId = keys.map(key => {
    return { ...carrosList[key], id: key }
  })

  return {
    carros: carrosListWithId,
  }
}

export default connect(mapStateToProps, {watchCarros})(MeuCarro)