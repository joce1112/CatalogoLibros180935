import React from "react";
import { Text, View, Linking } from "react-native";
import { styles } from './Home.styles';
import ButtonComponent from "../../components/Button";
import Amplify from "aws-amplify";
import {Authenticator} from 'aws-amplify-react-native';
import { withAuthenticator} from 'aws-amplify-react-native';
import { Card} from 'react-native-elements';
import Camara from "../../components/Camara";


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
        <View style={styles.camera}>
            <Camara/>
        </View>
        
        <Card style={{paddingBottom:100}}>
     <Card.Title style={{color:"red", paddingBottom:20}}>{i18n.t("profile")}</Card.Title>
     <Card.Divider />
<Text style={{paddingBottom:10}}> {i18n.t("user")}:  {authData.username}</Text> 
<Text style={{paddingBottom:10}}> {i18n.t("email")}:   {authData.attributes.email}</Text> 
<Text style={{paddingBottom:10}}> {i18n.t("phone")}: {authData.attributes.phone_number}</Text>   
</Card>

<ButtonComponent title="Logout" onPress={signOut} color="orange"/> 
    
<Text style={{ color: 'orange' , alignItems: 'center',justifyContent: 'center'}}
      onPress={() => Linking.openURL('https://github.com/joce1112/CatalogoLibros180935')}>
        Git Hub
</Text>
</View>

    );
}
export default withAuthenticator(HomeScreen);