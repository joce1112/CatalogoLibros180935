import React from 'react';
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator} from 'aws-amplify-react-native';
import { ScrollView, Text} from 'react-native';
import MainNavigator from './src/components/Navigator';

import { GlobalProvider } from './src/context/global/global.context';


Amplify.configure(awsconfig);

function App(authData) {
  console.log({authData}+'estoooo');
  return (
 <>
  <GlobalProvider>
      <Text>{authData.username}</Text> 
      <Text>{authData.refreshToken}</Text>
    <MainNavigator />
  </GlobalProvider>
  
 </>
 );
}
export default withAuthenticator(App);

