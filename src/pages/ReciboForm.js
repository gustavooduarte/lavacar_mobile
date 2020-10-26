import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

import FormRow from '../components/FormRow';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import { setFieldRecibo, createRecibo, setAllFieldsRecibo, resetFormRecibo } from '../actions';


class reciboForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount(){
    const { route, setAllFieldsRecibo } = this.props;
    const { params } = route;

    if (params && params.reciboToEdit){
      setAllFieldsRecibo(params.reciboToEdit);
    }else{
      this.props.resetFormRecibo();
    }
  }

  render() {
    const { reciboForm, setFieldRecibo, createRecibo, navigation } = this.props;

    return (
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <FormRow>
            <FormRow>
              <Text>Nome Emissor:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite nome do emissor..."
                value={reciboForm.nome}
                onChangeText={value => setFieldRecibo('nome', value)}
              />
            </FormRow>

            <FormRow>
              <Text>CPF Emissor:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite CPF do emissor..."
                value={reciboForm.cpf}
                onChangeText={value => setFieldRecibo('cpf', value)}
              />
            </FormRow>

            <Text>Data de Emissao:</Text>
            <DatePicker
              style={styles.dateInput}
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  borderRadius: 5
                }
              }}
              date={reciboForm.data_emissao}
              format="DD/MM/YYYY"
              onDateChange={value => setFieldRecibo('data_emissao', value)}
              placeholder="Selecione um dia..."
            />
          </FormRow>

          <FormRow>
            <Text>Servico:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={reciboForm.servico}
                onValueChange={itemValue => setFieldRecibo('servico', itemValue)}
                enabled = {false}
              >
                <Picker.Item label="Lavagem de Carro" value="Lavagem de Carro" />
              </Picker>
            </View>
          </FormRow>

          <FormRow>
            <Text>Valor:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite valor do servico..."
              value={reciboForm.valor}
              onChangeText={value => setFieldRecibo('valor', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Cidade:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite valor do servico..."
              value={reciboForm.cidade}
              onChangeText={value => setFieldRecibo('cidade', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Assinado:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={reciboForm.assinado}
                onValueChange={itemValue => setFieldRecibo('assinado', itemValue)}
                
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
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
                    await createRecibo(reciboForm);
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
    reciboForm: state.reciboForm
  });
}

const mapDispatchToProps = {
  setFieldRecibo,
  createRecibo,
  setAllFieldsRecibo,
  resetFormRecibo
}

export default connect(mapStateToProps, mapDispatchToProps)(reciboForm);