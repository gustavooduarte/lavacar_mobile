import React from 'react';
import { View, StyleSheet, ScrollView, Button, Image } from 'react-native';
import Line from '../components/Line'
import LongText from '../components/LongText'

import { connect } from 'react-redux';
import { deleteCarro }from '../actions';

class CarroDetail extends React.Component {
  render() {

    const { carro } = this.props.route.params;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: carro.img }}
            style={styles.carroImage}
          />

          <Line label={"Apelido"} content={carro.apelido} />
          <Line label={"Marca"} content={carro.marca} />
          <Line label={"Modelo"} content={carro.modelo} />
          <Line label={"Tamanho"} content={carro.tamanho} />

          <View style = {styles.opcoes}>
            <View style={styles.button}>
              <Button
                color='#00AFEF'
                title='Editar'
                onPress={() => {
                  this.props.navigation.replace('MeuCarroForm', { carroToEdit: carro });
                }}
              />
            </View>

            <View style={styles.button}>
              <Button
                color='#FF6961'
                title='Excluir'
                onPress={ async () => {
                  const hasDeleted = await this.props.deleteCarro(carro);

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
  carroImage: {
    aspectRatio: 1,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: 'center',
    marginTop: 10
  },
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
    marginTop: 15,
    margin: 4,
    flex: 2
  }
});

export default connect(null, {deleteCarro})(CarroDetail);