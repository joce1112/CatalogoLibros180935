import React, { useEffect, useState } from 'react';
import { Alert, Text, View, TextInput} from 'react-native';
import { styles } from "./Settings.styles";
import { Card } from 'react-native-elements';
import {list, create, onCreate} from '../../services/todos';
import ButtonComponent from '../../components/Button';

 export default function SettingsScreen(){
  const [todos, setTodos] = useState();

  const [todo, setTodo] = useState({titule:"", autor:"", isbm:""});
  async function listTodos(){
    const todosFetched = await list();
    if(todosFetched) setTodos(todosFetched);
  }
  async function createTodo(titule, autor, isbm){
    const todoCreated = await create({titule,autor,isbm})
    console.log(todoCreated)
    return todoCreated;
  }
 
  const addData = () =>{
    createTodo(todo.titule, todo.autor, todo.isbm);
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
      setTodo((current) => ({ ...current, titule: text}))
      }
      style={{width: 300, height:50, backgroundColor:"#e8eaed", }}/> 
     <Text>Autor:</Text>
     
     <TextInput  
     onChangeText={(text) =>
      setTodo((current)=> ({ ... current, autor:text}))
      }
     style={{width: 300, height:50, backgroundColor:"#e8eaed"}}
     /> 
     <Text>Isbm:</Text>

     <TextInput  
     onChangeText={(text) =>
      setTodo((current)=> ({ ... current, isbm:text}))
      }
     style={{width: 300, height:50, backgroundColor:"#e8eaed"}}
     /> 
        </Card>
      <ButtonComponent title="Agregar" onPress= {addData} />

      </View>
      );
  }