import React from "react";
import { Text, View, Linking } from "react-native";
import { styles } from './Home.styles';
import ButtonComponent from "../../components/Button";
import Amplify from "aws-amplify";
import {Authenticator} from 'aws-amplify-react-native';
import { withAuthenticator} from 'aws-amplify-react-native';
import { Card} from 'react-native-elements';


// export default function HomeScreen(){
 
    
async function signOut({}){
    try{
        await Amplify.Auth.signOut({global:true});
    } catch(error)
    {
        console.log(error)
    }

}
function HomeScreen({authData}) {
    console.log({authData}+'estoooo');
  
    return(
        
    <View style={styles.container}>
    
    <Card>
         <Card.Title>Perfil</Card.Title>
         <Card.Divider />
    <Text>Usuario:  {authData.username}</Text> 
    <Text>Email:   {authData.attributes.email}</Text> 
    <Text>Telefono: {authData.attributes.phone_number}</Text>   
    </Card>
    <ButtonComponent title="Logout" onPress={signOut} color="orange"/> 
        
    <Text style={{ color: 'orange' }}
          onPress={() => Linking.openURL('https://github.com/joce1112/CatalogoLibros180935')}>
            Git Hub
    </Text>
    </View>
    );
}
export default withAuthenticator(HomeScreen);