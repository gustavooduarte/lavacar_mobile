import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ReciboList from '../components/ReciboList'

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
        <View >
          <ReciboList
            recibos={this.props.recibos}
            onPressItem={(parameters) => this.props.navigation.navigate('ReciboDetail', parameters)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignContent: 'center',
    height: '100%',
  }
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