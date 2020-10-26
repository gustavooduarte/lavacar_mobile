import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Line from '../components/Line'

import { connect } from 'react-redux';
import { deleteRecibo }from '../actions';

class ReciboDetail extends React.Component {
  render() {

    const { recibo } = this.props.route.params;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.calendarIcon}>
            <Icon name={'format-list-bulleted'} size={70} color='#808080' />
          </View>
          <Line label={"Nome"} content={recibo.nome} />
          <Line label={"CPF"} content={recibo.cpf} />
          <Line label={"Data de Emissão"} content={recibo.data_emissao} />
          <Line label={"Servico"} content={recibo.servico} />
          <Line label={"Valor"} content={recibo.valor} />
          <Line label={"Cidade"} content={recibo.cidade} />
          <Line label={"Assinado"} content={recibo.assinado} />

          <View style = {styles.opcoes}>
            <View style={styles.button}>
              <Button
                color='#00AFEF'
                title='Editar'
                onPress={() => {
                  this.props.navigation.replace('ReciboForm', { reciboToEdit: recibo });
                }}
              />
            </View>

            <View style={styles.button}>
              <Button
                color='#FF6961'
                title='Excluir'
                onPress={ async () => {
                  const hasDeleted = await this.props.deleteRecibo(recibo);

                  if(hasDeleted) {
                    this.props.navigation.goBack();
                  }

                }}
              />
            </View>
          </View>
        </View>
        

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  opcoes:{
    flexDirection: 'row'
  },
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  calendarIcon: {
    alignSelf: 'center',
    padding: 20,
  },
  button: {
    margin: 4,
    flex: 2
  }
});

export default connect(null, {deleteRecibo})(ReciboDetail);