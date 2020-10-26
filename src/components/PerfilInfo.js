import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Alert, Button} from 'react-native';
import PerfilInfoLine from './PerfilInfoLine'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const PerfilInfo = (props) => {
  const { perfil, onPressButtonExit } = props
  const { first, last } = perfil.name;
  const nome_completo = first + ' ' + last;

  return (
    <View>
      <ScrollView>
        <Image source={{ uri: perfil.picture.large }}
          style={styles.perfilPhoto}
        />
        <Text style={styles.perfilName}>{nome_completo}</Text>
        <Text style={styles.perfilInformations}>Informações da Conta</Text>

        <View style={styles.container}>

          <PerfilInfoLine label={'Nome: '} content={nome_completo} />
          <PerfilInfoLine label={'Email: '} content={perfil.email} />
          <PerfilInfoLine label={'Celular: '} content={perfil.cell} />
          <PerfilInfoLine label={'Senha '} />
          <PerfilInfoLine label={'Endereço: '} content={perfil.location.street.name + '...'} />
        </View>

        <TouchableOpacity style={styles.btnSair} onPress={() => { onPressButtonExit({path: 'Login'}); }}>
          <Icon name={'exit-to-app'} color='#888' size={30} />
        </TouchableOpacity>
        <Text style={styles.textSair}>Sair</Text>


      </ScrollView>
      

    </View>
  );
}


const styles = StyleSheet.create({
  perfilPhoto: {
    aspectRatio: 1,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: 'center',
    marginTop: 10
  },
  perfilName: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: '#808080'
  },
  perfilInformations: {
    fontSize: 17,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#00AFEF'
  },
  btnSair: {
    backgroundColor: '#FFF',
    elevation: 3,
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 100
  },
  textSair: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  
});

export default PerfilInfo;