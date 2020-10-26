import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import { Picker } from '@react-native-community/picker';

import { RNCamera } from 'react-native-camera';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImgToBase64 from 'react-native-image-base64';

import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setFieldCarro, createCarro, setAllFieldsCarro, resetFormCarro } from '../actions';


class MeuCarroForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isCamera: false,
      isCameraRoll: false
    }
  }

  componentDidMount() {
    const { route, setAllFieldsCarro } = this.props;
    const { params } = route;

    if (params && params.carroToEdit) {
      setAllFieldsCarro(params.carroToEdit);
    } else {
      this.props.resetFormCarro();
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true
      }

      const data = await this.camera.takePictureAsync(options);

      if (data) {
        this.props.setFieldCarro('img', data.base64);

        this.setState({
          isCamera: false
        })
      }

    }
  }

  viewGallery() {
    this.requestExternalStorageAcces();

    return (
      <CameraRollPicker
        maximum = {1}
        selectSingleItem={true}
        
        callback = { (volta) => {
          if(volta.length > 0){
            ImgToBase64.getBase64String(volta[0].uri)
            .then(stringConvertida => {
              this.props.setFieldCarro('img', stringConvertida)
            })
            .catch(error => {
              console.log(error)
            })
          }

          this.setState({
            isCameraRoll: false
          })
        }}

      />
    )
  }

  async requestExternalStorageAcces(){
    try{
      const permission = await PermissionsAndroid
        .request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if(permission !== PermissionsAndroid.RESULTS.GRANTED){
          Alert.alert('Permissão Negada')
        }
    }catch (error){
      console.log(error);
    }
  }

  viewCamera() {
    return (
      <View style={styles.camera}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Nós precisamos de sua permisão para usar a câmera',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar'
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to record audio',
            message: 'Nós precisamos de sua permisão para gravar áudio',
            buttonPositive: 'Aceito',
            buttonNegative: 'Cancelar'
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
            <Text style = {{color: 'white'}}>Capturar!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  viewForm() {
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
            <Text>Imagem:</Text>
            {
              carroForm.img ?
                <Image source={{ uri: `data:image/jpeg;base64,${carroForm.img}` }}
                  style={styles.carroImage}
                />
                :
                null
            }

            <View>
              <Button
                color='gray'
                title="Capturar Imagem"
                onPress={() => {
                  Alert.alert(
                    'Captura Imagem',
                    'De onde você quer pegar a imagem?',
                    [
                      {
                        text: 'Câmera',
                        onPress: () => {
                          this.setState({
                            isCamera: true
                          })
                        }
                      },
                      {
                        text: 'Galeria',
                        onPress: () => {
                          this.setState({
                            isCameraRoll: true
                          })
                        }
                      }
                    ]
                  )
                }}
              />
            </View>
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

                  try {
                    await createCarro(carroForm);
                    navigation.goBack();
                  } catch (error) {
                    Alert.alert('Erro', error.message)
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

  render() {
    if(this.state.isCameraRoll){
      return (this.viewGallery());
    }

    if (this.state.isCamera) {
      return (this.viewCamera());
    }

    return (this.viewForm());

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
  carroImage: {
    aspectRatio: 1,
    width: '100%',
    marginBottom: 5
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray'
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#00AFEF',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 50,
    marginHorizontal: 20
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