import React from 'react'
import { Button, Text, View } from 'react-native'
import ServiceProfileInfo from './ServiceProfileInfo'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import ProfileStyle from '../../../styles/ProfileStyle';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedBtm3 } from '../../../styles/components/RoundedBtm';


interface Props extends StackScreenProps<RootStackParamList, 'InfoProfileScreen'> { };

export const InfoProfileScreen = ({ navigation, route }: Props) => {

  const { removeSession, user } = ServiceProfileInfo();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >

        <View style={ProfileStyle.container}>

          <Ionicons
            name='person-circle-outline'
            size={150}
            color='#088395' />

          <Text style={ProfileStyle.container_text}>{user?.name} {user?.lastName}</Text>

        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#0A4D68', marginLeft: 39, marginTop: 15 }} >
          Información del usuario
        </Text>

        <View style={ProfileStyle.container_2}>
          <View style={ProfileStyle.container_3}>
            <View style={ProfileStyle.container_icon}>

              <Ionicons
                name='person-circle-outline'
                size={40}
                color='#0A4D68' />
            </View>

            <View>

              <Text style={{ color: '#0A4D68', fontWeight: 'bold' }}>Nombre:</Text>
              <Text style={{ color: '#0A4D68', }}>{user?.name}</Text>

            </View>
          </View>

          <View style={ProfileStyle.container_3}>
            <View style={ProfileStyle.container_icon}>

              <Ionicons
                name='person-circle-outline'
                size={40}
                color='#0A4D68' />
            </View>

            <View>

              <Text style={{ color: '#0A4D68', fontWeight: 'bold' }}>Apellido:</Text>
              <Text style={{ color: '#0A4D68', }}>{user?.lastName}</Text>

            </View>
          </View>

          <View style={ProfileStyle.container_3}>
            <View style={ProfileStyle.container_icon}>

              <Ionicons
                name='mail-outline'
                size={40}
                color='#0A4D68'
              />
            </View>

            <View>

              <Text style={{ color: '#0A4D68', fontWeight: 'bold' }}>Email:</Text>
              <Text style={{ color: '#0A4D68', }}>{user?.email}</Text>

            </View>
          </View>
          <View style={ProfileStyle.container_3}>
            <View style={ProfileStyle.container_icon}>

              <Ionicons
                name='male-outline'
                size={40}
                color='#0A4D68' />
            </View>

            <View>

              <Text style={{ color: '#0A4D68', fontWeight: 'bold' }}>Edad:</Text>
              <Text style={{ color: '#0A4D68', }}>{user?.edad}</Text>

            </View>
          </View>
        </View>

      <View style={ProfileStyle.container_button}>
        <View>
          <RoundedBtm3 text='Cerrar Sesion' onPress={() => {removeSession(); navigation.replace('HomeScreen') }}/>
        </View>

        <View>
          <RoundedBtm3 text='Editar Perfil' onPress={() => {navigation.navigate('PorfileUpdateScreen', { user: user! })}}/>
        </View>
      </View>

      {/* <View>

        <View>
          <Text onPress={() => {removeSession(); navigation.replace('HomeScreen') }}>Cerrar Sesion</Text>
        </View>
        
        <View style={ProfileStyle.button} >
          <Text onPress={() => {navigation.navigate('PorfileUpdateScreen', { user: user! })}} style={{color:"#05BFDB"}}>Editar Profile</Text>
        </View>

      </View> */}

        {/* <Button
            onPress={() => {
              removeSession();
              navigation.replace('HomeScreen')
            }}
            title='Cerrar sesión'
            /> */}

          {/* <Button
            onPress={() => {
              navigation.navigate('PorfileUpdateScreen', { user: user! })
            }}
            title='Editar Perfil' /> */}


      </View>
    </SafeAreaView>
    
  )
  
}

