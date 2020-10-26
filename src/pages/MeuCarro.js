import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import CarroList from '../components/CarroList'

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
          <CarroList
            carros={this.props.carros}
            onPressItem={(parameters) => this.props.navigation.navigate('MeuCarroDetail', parameters)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignContent: 'center',
    height: '100%',
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