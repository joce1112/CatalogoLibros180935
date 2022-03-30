import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Linking  } from 'react-native';

import { styles } from "./Login.styles";
import ButtonComponent from "../../components/Button";

export default function Login({ onPress }){
    return(
        <View style={styles.container}>
        <StatusBar/>
        <Text>Login Screen</Text>
        <ButtonComponent title="Login" onPress={onPress} color="#196e7e"/>         
        <Text style={{ color: 'orange' }}
          onPress={() => Linking.openURL('https://github.com/joce1112/CatalogoLibros180935')}>
            Git Hub
        </Text>
        </View>
      );
    }