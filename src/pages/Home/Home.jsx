import React from "react";
import { Text, View } from "react-native";
import { styles } from './Home.styles';
import ButtonComponent from "../../components/Button";
import Amplify from "aws-amplify";
import {Authenticator} from 'aws-amplify-react-native';


export default function HomeScreen(){
    const signUpConfig = {
        header: 'My Customized Sign Up',
        hideAllDefaults: true,
        defaultCountryCode: '1',
        signUpFields: [
          {
            label: 'My user name',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
          },
          {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
          },
          {
            label: 'PhoneNumber',
            key: 'phone_number',
            required: true,
            displayOrder: 3,
            type: 'string'
          },
          {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 4,
            type: 'string'
          }
        ]
      };    
    
async function signOut({}){
    try{
        await Amplify.Auth.signOut({global:true});

    } catch(error)
    {
        console.log(error)
    }

}

    return(
    <View style={styles.container}>


    <Text>Home Screen</Text>
    <ButtonComponent title="Logout" onPress={signOut} color="#805288"/>    
    <Authenticator usernameAttributes='userName'/>
    <Authenticator usernameAttributes='phone_number'/>
    <Authenticator usernameAttributes='email'/>
    <Authenticator />



    </View>
    );
}
