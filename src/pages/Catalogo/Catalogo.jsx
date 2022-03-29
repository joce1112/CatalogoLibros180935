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
        todos.map((todo)=><Text key={todo.id}>{`${todo.name}`}</Text>)}
       {todos && 
        todos.map((todo)=><Text key={todo.id}>{` ${todo.description}`}</Text>)}
         {/* {todos && 
        todos.map((todo)=><Text key={todo.id}>{` ${todo.ipr}`}</Text>)} */}
        </Card>
       <Card>
            <ListItem>
              
              <Badge
                value={3}
                textStyle={{ color: 'orange' }}
                containerStyle={{ marginTop: -20 }}
              />
               
            </ListItem> 
        </Card> 
        
        </ScrollView>
        
        );
}