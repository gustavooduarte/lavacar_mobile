import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import AgendamentoCard from '../components/AgendamentoCard';

import { connect } from 'react-redux';

import { watchAgendamentos } from '../actions'

class Agenda extends React.Component {
  componentDidMount(){
    this.props.watchAgendamentos();
  }

  render() {
    if(this.props.agendamentos == null){
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={150} color='#00AFEF' />
        </View>
      ) 
    }

    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}> Histórico de Agendamentos </Text>
        </View>

        <View>
          <FlatList
            style={styles.list}
            data={this.props.agendamentos}
            keyExtractor={agendamento => agendamento.id.toString()}
            renderItem={({ item: agendamento }) => (
              <AgendamentoCard 
                agendamento = {agendamento}
                onPressItem={() => this.props.navigation.navigate('AgendamentoDetail', { agendamento })}
              />
           )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading:{
    alignContent: 'center',
    height: '100%',
  },
  list: {
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