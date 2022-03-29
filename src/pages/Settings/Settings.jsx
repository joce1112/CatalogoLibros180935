import React, { useEffect, useState } from 'react';
import { Alert, Text, View, TextInput} from 'react-native';
import { styles } from "./Settings.styles";
import { Card } from 'react-native-elements';
import {list, create, onCreate} from '../../services/todos';
import ButtonComponent from '../../components/Button';

 export default function SettingsScreen(){
  const [todos, setTodos] = useState();

  const [todo, setTodo] = useState({name:"", description:""});
  async function listTodos(){
    const todosFetched = await list();
    if(todosFetched) setTodos(todosFetched);
  }
  async function createTodo(name, description){
    const todoCreated = await create({name,description})
    console.log(todoCreated)
    return todoCreated;
  }
 
  const addData = () =>{
    createTodo(todo.name, todo.description, todo.ipr);
    Alert.alert('Se registro correctamente el libro');
  };

  useEffect(()=>{
    listTodos();
    let subscription;
    (async function suscribe(){
      subscription = await onCreate(listTodos);
    })();
    return () => {
      subscription?.unsubscribe();
    };
  },[]);
  
    return(
      <View style={styles.container}>
        <Card>
        <Card.Title>Añadir un nuevo libro</Card.Title>
         <Card.Divider />
     <Text>Titulo:</Text>
     <TextInput  
     onChangeText ={(text) => 
      setTodo((current) => ({ ...current, name: text}))
      }
      style={{width: 300, height:50, backgroundColor:"#e8eaed", }}/> 
     <Text>Autor:</Text>
     
     <TextInput  
     onChangeText={(text) =>
      setTodo((current)=> ({ ... current, description:text}))
      }
     style={{width: 300, height:50, backgroundColor:"#e8eaed"}}
     /> 
     
     
      <Text>Settings Screen</Text>
      <ButtonComponent title="Create todo" onPress= {addData} />
      </Card>
      </View>
      );
  }