import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

import FormRow from '../components/FormRow';

import { connect } from 'react-redux';
import { setFieldCarro, createCarro, setAllFieldsCarro, resetFormCarro } from '../actions';

class MeuCarroForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount(){
    const { route, setAllFieldsCarro } = this.props;
    const { params } = route;

    if (params && params.carroToEdit){
      setAllFieldsCarro(params.carroToEdit);
    }else{
      this.props.resetFormCarro();
    }

  }

  render() {
    const { carroForm, setFieldCarro, createCarro, navigation } = this.props;

    return (
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <FormRow>
            <Text>Apelido:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite nome do carro..."
              value={carroForm.apelido}
              onChangeText={value => setFieldCarro('apelido', value)}
            />
          </FormRow>

          <FormRow>
            <Text>IMG URL:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite url image..."
              value={carroForm.img}
              onChangeText={value => setFieldCarro('img', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Marca:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite a marca do carro..."
              value={carroForm.marca}
              onChangeText={value => setFieldCarro('marca', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Modelo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite modelo do carro..."
              value={carroForm.modelo}
              onChangeText={value => setFieldCarro('modelo', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Tamanho do Carro:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={carroForm.tamanho}
                onValueChange={itemValue => setFieldCarro('tamanho', itemValue)}
              >
                <Picker.Item label="Pequeno" value="Pequeno" />
                <Picker.Item label="Médio" value="Médio" />
                <Picker.Item label="Grande" value="Grande" />
              </Picker>
            </View>
          </FormRow>

          {
            this.state.isLoading ?
              <ActivityIndicator color='#00AFEF' />
              :
              <Button
                title="Confirmar"
                color='#00AFEF'
                onPress={async () => {
                  this.setState({ isLoading: true })
                  
                  try{
                    await createCarro(carroForm);
                    navigation.goBack();
                  } catch (error){
                    Alert.alert('Erro',error.message)
                  } finally {
                    this.setState({ isLoading: false })
                  }
                }}
              />
          }

        </View>
      </ScrollView>
    )

  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray'
  }
});

const mapStateToProps = (state) => {
  return ({
    carroForm: state.carroForm
  });
}

const mapDispatchToProps = {
  setFieldCarro,
  createCarro,
  setAllFieldsCarro,
  resetFormCarro
}

export default connect(mapStateToProps, mapDispatchToProps)(MeuCarroForm);