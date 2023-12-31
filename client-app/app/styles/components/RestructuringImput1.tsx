import React from 'react';
import styles from '../Styles';
import { Text, View, Image, TextInput, KeyboardType } from 'react-native';

interface props {
    image: any,
    placeholder: string, 
    value: string,
    KeyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (Property: string, value: any) => void

};

export const RestructuringImput1 = ({
    image, 
    placeholder, 
    value, 
    KeyboardType, 
    secureTextEntry = false,
    property,
    onChangeText

}:props)=>{
    return(
        <View style={styles.imputForm} >
                    {/*imagenes de formulario email*/}
                    <Image source={ image }
                        style={styles.formIcon1} />

                    <TextInput
                        style={styles.texImputForm}
                        placeholder={placeholder}
                        keyboardType={KeyboardType}
                        value={value}
                        onChangeText ={text => onChangeText( property, text )}
                        secureTextEntry= { secureTextEntry }
                    />
                </View>
                
    );
};

