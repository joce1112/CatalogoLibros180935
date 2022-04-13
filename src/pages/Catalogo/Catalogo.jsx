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
           <Text>{i18n.t("name")}: {`${todo.Nombre}`}</Text>
           <Text>{i18n.t("description")}: {`${todo.Descripcion}`}</Text>
           <Text>{i18n.t("isbm")}: {`${todo.Isbm}`}</Text>
           <Text>{i18n.t("status")}: {`${todo.Estatus}`}</Text>
           <Text>{i18n.t("category")}: {`${todo.Categoria}`}</Text>
           <Text>{i18n.t("date")}: {`${todo.createdAt}`}</Text>
        </Card>
            )}
        </ScrollView>
        
        );
}