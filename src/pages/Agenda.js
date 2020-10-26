import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import AgendamentoList from '../components/AgendamentoList';

import { connect } from 'react-redux';

import { watchAgendamentos } from '../actions'

class Agenda extends React.Component {
  componentDidMount(){
    this.props.watchAgendamentos();
  }

  render() {
    if(this.props.agendamentos == null){
      return <ActivityIndicator color='#00AFEF' />
    }

    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}> Histórico de Agendamentos </Text>
        </View>

        <View style={styles.container}>
          <AgendamentoList
            agendamentos={this.props.agendamentos}
            onPressItem={(parameters) => this.props.navigation.navigate('AgendamentoDetail', parameters)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  title: {
    padding: 5,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 3,
    borderBottomWidth: 4,
    borderBottomColor: "#00AFEF",
    width: 250,
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 16,
    color: "#00AFEF",
    fontWeight: 'bold',
  }
});

const mapStateToProps = state => {
  const { agendamentosList } = state;

  if(agendamentosList == null){
    return {agendamentos: agendamentosList};
  }

  const keys = Object.keys(agendamentosList)
  const agendamentosListWithId = keys.map(key => {
    return {...agendamentosList[key], id:key}
  })

  return {
    agendamentos: agendamentosListWithId,

  }
}

export default connect(mapStateToProps, {watchAgendamentos})(Agenda);