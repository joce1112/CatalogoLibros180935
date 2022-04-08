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
          {todos && todos.map((todo)=>
         <Card key={todo.id}>                      
           <Text>Nombre: {`${todo.Nombre}`}</Text>
           <Text>Descripcion: {`${todo.Descripcion}`}</Text>
           <Text>Isbm: {`${todo.Isbm}`}</Text>
           <Text>Estatus: {`${todo.Estatus}`}</Text>
           <Text>Categoria: {`${todo.Categoria}`}</Text>
           <Text>Fecha: {`${todo.createdAt}`}</Text>
        </Card>
            )}
        </ScrollView>
        
        );
}