import React, { useContext} from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import { createBottomTabNavigator }from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "../../pages/Login";
import SettingsScreen from '../../pages/Settings';
import HomeScreen from '../../pages/Home';
import { GlobalContext } from '../../context/global/global.context';
import CatalogoScreen from '../../pages/Catalogo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainNavigator(){
    const {state, login, logout} = useContext(GlobalContext);
    console.log({state});
   return (
   <NavigationContainer>
     {!state.user ? (
     <Stack.Navigator>
       <Stack.Screen 
       options={{ headerShown: false }}
       children={(props)=>(
         <LoginScreen { ... props} onPress={()=>login()}/>
       )}
       name="Login"
       />
     </Stack.Navigator>
     ) : (
    <Tab.Navigator 
     screenOptions={({ route }) => ({
       tabBarIcon:({ focused, color, size })=>{
        let iconName;

        if(route.name === "Info") {
          iconName = focused
          ? "ios-information-circle"
          : "ios-information-circle-outline"
          // ?"ios-information-pluscircleo"
        }else if(route.name === "Registro"){
        iconName ="ios-add-circle-outline";          
        }else if(route.name === "Catalogo"){
          iconName ="ios-list";  
        }
        return <Ionicons name={iconName} size={size} color={color}/>;

       },
       tabBarActiveTintColor:"blue",
       tabBarInactiveTintColor:"gray",
     })}
     >
       <Tab.Screen name='Registro' component={SettingsScreen}/>
       {/* cambiar component */}
       <Tab.Screen name='Catalogo' component={CatalogoScreen}/> 
       <Tab.Screen 
       name='Info' 
       children={(props) =>(
         <HomeScreen { ... props} onPress={() => logout()}/>
       )}
       />
      
     </Tab.Navigator>
     
     )}
     
   </NavigationContainer>
   );
}
 