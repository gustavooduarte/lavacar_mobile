import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './pages/LoginScreen'

// Importanto Páginas necessárias
import Agenda from './pages/Agenda';
import AgendamentoDetail from './pages/AgendamentoDetail';
import AgendamentoForm from './pages/AgendamentoForm';

import MeuCarro from './pages/MeuCarro';
import MeuCarroDetail from './pages/MeuCarroDetail';
import MeuCarroForm from './pages/MeuCarroForm';

import Recibos from './pages/Recibos';
import ReciboDetail from './pages/ReciboDetail';
import ReciboForm from './pages/ReciboForm';

import Perfil from './pages/Perfil';


// ============================================================================
// ######################### STACK NAVIGATOR ##################################
// ============================================================================
const Stack = createStackNavigator();

// ######################### AGENDA ##################################
function stackAgenda() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#00AFEF' }, headerTintColor: 'white' }}>
      <Stack.Screen name="Agenda" component={Agenda}
        options={ ({navigation}) => ({
          headerLeft: null,
          headerRight: () =>(
            <TouchableOpacity onPress={() => navigation.navigate('AgendamentoForm')}
              style={{ marginRight: 10, elevation: 100 }}
            >
              <Icon name={'plus-circle'} size={35} color="white" />
            </TouchableOpacity>
          ),
        })
      }
      />

      <Stack.Screen name='AgendamentoDetail'
        component={AgendamentoDetail}
        options={{ title: 'Detalhes do Agendamento' }} />

      <Stack.Screen name='AgendamentoForm'
        component={AgendamentoForm}
        options={ ({route}) => {
          if(route.params && route.params.agendamentoToEdit){
            return { title: 'Atualizar Agendamento'}
          }else{
            return { title: 'Agendar Lavagem' }
          }
        }} />

    </Stack.Navigator>
  );
}

// ######################### MEU CARRO ##################################
function stackCarro() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#00AFEF' }, headerTintColor: 'white' }}>
      <Stack.Screen name="Carros" component={MeuCarro}
        options={({ navigation }) => ({
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MeuCarroForm')}
              style={{ marginRight: 10, elevation: 100 }}
            >

              <Icon name={'plus-circle'} size={35} color="white" />

            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen name='MeuCarroDetail'
        component={MeuCarroDetail}
        options={{ title: 'Detalhes do Carro' }} />

      <Stack.Screen name='MeuCarroForm'
        component={MeuCarroForm}
        options={({ route }) => {
          if (route.params && route.params.carroToEdit) {
            return { title: route.params.carroToEdit.apelido }
          } else {
            return { title: 'Registrar Carro' }
          }
        }} />
    </Stack.Navigator>
  );
}

// ######################### RECIBOS ##################################
function stackRecibos() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#00AFEF' }, headerTintColor: 'white' }}>
      <Stack.Screen name="Recibos" component={Recibos}
        options={({ navigation }) => ({
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('ReciboForm')}
              style={{ marginRight: 10, elevation: 100 }}
            >

              <Icon name={'plus-circle'} size={35} color="white" />

            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen name='ReciboDetail'
        component={ReciboDetail}
        options={{ title: 'Detalhes do Recibo' }} />
      
      <Stack.Screen name='ReciboForm'
        component={ReciboForm}
        options={({ route }) => {
          if (route.params && route.params.reciboToEdit) {
            return { title: 'Editar Recibo' }
          } else {
            return { title: 'Criar Recibo' }
          }
        }} />
    </Stack.Navigator>
  );
}

// ######################### Perfil ##################################
function stackPerfil() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#00AFEF' }, headerTintColor: 'white' }}>
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerLeft: null }} />
    </Stack.Navigator>
  );
}

// ============================================================================
// ######################### TAB NAVIGATOR ##################################
// ============================================================================
const Tab = createBottomTabNavigator();

function tabHome() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Agenda") {
            iconName = 'calendar';
          } else if (route.name === "Meu Carro") {
            iconName = 'car';
          } else if (route.name === "Recibos") {
            iconName = 'format-list-bulleted';
          } else if (route.name === "Perfil") {
            iconName = 'account';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: '#00AFEF',
        inactiveBackgroundColor: '#00AFEF',
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255,255,255,0.65)',
      }}
    >
      <Tab.Screen name="Agenda" component={stackAgenda} />
      <Tab.Screen name="Meu Carro" component={stackCarro} />
      <Tab.Screen name="Recibos" component={stackRecibos} />
      <Tab.Screen name="Perfil" component={stackPerfil} />
    </Tab.Navigator>
  );
}

// ============================================================================
// ######################### FLUXO INICIAL ##################################
// ============================================================================
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={tabHome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
