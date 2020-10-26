import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

import FormRow from '../components/FormRow';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import { 
  setFieldAgendamento, 
  createAgendamento, 
  setAllFieldsAgendamento, 
  resetFormAgendamento,
  watchCarros
} from '../actions';

import { STATUS_AGUARDANDO , STATUS_CANCELADO, STATUS_CONFIRMADO, STATUS_REALIZADO } from '../utils'

class AgendamentoForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount(){
    const { route, setAllFieldsAgendamento } = this.props;
    const { params } = route;

    if (params && params.agendamentoToEdit){
      setAllFieldsAgendamento(params.agendamentoToEdit);
    }else{
      this.props.resetFormAgendamento();
    }

    this.props.watchCarros();
  }

  render() {
    const { agendamentoForm, setFieldAgendamento, createAgendamento, navigation,  } = this.props;

    if (this.props.carros == null) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={150} color='#00AFEF' />
        </View>
      )
    }

    return (
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <FormRow>
            <Text>Status:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={agendamentoForm.status}
                onValueChange={itemValue => setFieldAgendamento('status', itemValue)}
              >
                <Picker.Item label={STATUS_AGUARDANDO} value={STATUS_AGUARDANDO} />
                <Picker.Item label={STATUS_CONFIRMADO} value={STATUS_CONFIRMADO} />
                <Picker.Item label={STATUS_CANCELADO} value={STATUS_CANCELADO} />
                <Picker.Item label={STATUS_REALIZADO} value={STATUS_REALIZADO} />
              </Picker>
            </View>
          </FormRow>

          <FormRow>
            <Text>Data:</Text>
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
              date={agendamentoForm.data}
              format="DD/MM/YYYY"
              onDateChange={value => setFieldAgendamento('data', value)}
              placeholder="Selecione um dia..."
            />
          </FormRow>

          <FormRow>
            <Text>Horário:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={agendamentoForm.horario}
                onValueChange={itemValue => setFieldAgendamento('horario', itemValue)}
              >
                <Picker.Item label="8:00h" value="8:00h" />
                <Picker.Item label="9:00h" value="9:00h" />
                <Picker.Item label="10:00h" value="10:00h" />
                <Picker.Item label="11:00h" value="11:00h" />
                <Picker.Item label="14:00h" value="14:00h" />
                <Picker.Item label="15:00h" value="15:00h" />
                <Picker.Item label="16:00h" value="16:00h" />
                <Picker.Item label="17:00h" value="17:00h" />
              </Picker>
            </View>
            
          </FormRow>

          <FormRow>
            <Text>Selecione o Carro:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={agendamentoForm.carro}
                onValueChange={itemValue => setFieldAgendamento('carro', itemValue)}
              >
                {
                  this.props.carros.map((carro, index) => {
                    return (
                      <Picker.Item label={carro.apelido} value={carro.apelido} key={index} />
                    )
                  })
                }
              </Picker>
            </View>
          </FormRow>

          <FormRow>
            <Text>Valor:</Text>
            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              placeholder="Digite valor do servico..."
              value={agendamentoForm.valor}
              onChangeText={value => setFieldAgendamento('valor', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Forma de Pagamento:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={agendamentoForm.forma_pagamento}
                onValueChange={itemValue => setFieldAgendamento('forma_pagamento', itemValue)}
              >
                <Picker.Item label="Dinheiro" value="Dinheiro" />
                <Picker.Item label="Cartão de Crédito" value="Cartão de Crédito" />
                <Picker.Item label="Cartão de Débito" value="Cartão de Débito" />
              </Picker>
            </View>
          </FormRow>

          <FormRow>
            <Text>Endereço:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite nome do carro..."
              value={agendamentoForm.endereco}
              onChangeText={value => setFieldAgendamento('endereco', value)}
            />
          </FormRow>

          <FormRow>
            <Text>Observações:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite suas observações aqui..."
              value={agendamentoForm.observacoes}
              onChangeText={value => setFieldAgendamento('observacoes', value)}
              numberOfLines={5}
              multiline={true}
            />
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
                    await createAgendamento(agendamentoForm);
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
  const { carrosList } = state;

  if (carrosList == null) {
    return { 
      carros: carrosList,
      agendamentoForm: state.agendamentoForm
    };
  }

  const keys = Object.keys(carrosList)
  const carrosListWithId = keys.map(key => {
    return { ...carrosList[key], id: key }
  })

  return {
    carros: carrosListWithId,
    agendamentoForm: state.agendamentoForm
  }
}

const mapDispatchToProps = {
  setFieldAgendamento,
  createAgendamento,
  setAllFieldsAgendamento,
  resetFormAgendamento,
  watchCarros
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendamentoForm);