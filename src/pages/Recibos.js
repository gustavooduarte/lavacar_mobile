import React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import ReciboCard from '../components/ReciboCard'

import { connect } from 'react-redux';

import { watchRecibos } from '../actions'

class Recibos extends React.Component {
  componentDidMount() {
    this.props.watchRecibos();
  }

  render() {
    if (this.props.recibos == null) {
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
          data={this.props.recibos}
          keyExtractor={recibo => recibo.id}
          renderItem={({ item: recibo }) => (

          <ReciboCard
            recibo={recibo}
            onPressItem={() => this.props.navigation.navigate('ReciboDetail', { recibo })} />
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
  const { recibosList } = state;

  if (recibosList == null) {
    return { recibos: recibosList };
  }

  const keys = Object.keys(recibosList)
  const recibosListWithId = keys.map(key => {
    return { ...recibosList[key], id: key }
  })

  return {
    recibos: recibosListWithId,

  }
}

export default connect(mapStateToProps, { watchRecibos })(Recibos);