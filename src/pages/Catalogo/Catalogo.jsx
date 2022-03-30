import React, { useEffect, useState } from 'react';
import { ScrollView, Text} from 'react-native';
import { styles } from "./Catalogos.styles";
import {list, onCreate} from '../../services/todos';
import { Card, ListItem, Badge} from 'react-native-elements';


 
export default function CatalogoScreen({ onPress }){
    const [todos, setTodos] = useState();

    async function listTodos(){
      const todosFetched = await list();
      if(todosFetched) setTodos(todosFetched);
    }
   

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
        <ScrollView>
         <Card>
         <Card.Title>Lista de libros disponibles</Card.Title>
         <Card.Divider />
         
        {todos && 
        todos.map((todo)=><Text key={todo.id}>Titulo: {`${todo.titule}`}</Text>)}
       {todos && 
        todos.map((todo)=><Text key={todo.id}>Autor: {` ${todo.autor}`}</Text>)}
        {todos && 
        todos.map((todo)=><Text key={todo.id}>Isbm: {` ${todo.isbm}`}</Text>)}
         {/* {todos && 
        todos.map((todo)=><Text key={todo.id}>{` ${todo.ipr}`}</Text>)} */}
        </Card>
            
        </ScrollView>
        
        );
}