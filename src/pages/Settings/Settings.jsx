import React, { useEffect, useState } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';
import { styles } from "./Settings.styles";
import { Card } from 'react-native-elements';
import { list, create, onCreate } from '../../services/todos';
import ButtonComponent from '../../components/Button';

export default function SettingsScreen() {
  const [todos, setTodos] = useState();

  const [todo, setTodo] = useState({ Nombre: "", Descripcion: "", Isbm: "", Estatus: true, Categoria:"" });
  async function listTodos() {
    const todosFetched = await list();
    if (todosFetched) setTodos(todosFetched);
  }
  async function createTodo(Nombre, Descripcion, Isbm, Estatus, Categoria) {
    const todoCreated = await create({ Nombre, Descripcion, Isbm, Estatus, Categoria})
    console.log(todoCreated)
    return todoCreated;
  }

  const addData = () => {
    createTodo(todo.Nombre, todo.Descripcion, todo.Isbm, todo.Estatus, todo.Categoria);
    Alert.alert('Se registro correctamente el libro');
  };

  useEffect(() => {
    listTodos();
    let subscription;
    (async function suscribe() {
      subscription = await onCreate(listTodos);
    })();
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Añadir un nuevo libro</Card.Title>
        <Card.Divider />
        <Text>Nombre:</Text>
        <TextInput
          onChangeText={(text) =>
            setTodo((current) => ({ ...current, Nombre: text }))
          }
          style={{ width: 300, height: 50, backgroundColor: "#e8eaed", }} />
        <Text>Descripcion:</Text>

        <TextInput
          onChangeText={(text) =>
            setTodo((current) => ({ ...current, Descripcion: text }))
          }
          style={{ width: 300, height: 50, backgroundColor: "#e8eaed" }}
        />
        <Text>Isbm:</Text>

        <TextInput
          onChangeText={(text) =>
            setTodo((current) => ({ ...current, Isbm: text }))
          }
          style={{ width: 300, height: 50, backgroundColor: "#e8eaed" }}
        />
        
        <Text>Categoria:</Text>

        <TextInput
          onChangeText={(text) =>
            setTodo((current) => ({ ...current, Categoria: text }))
          }
          style={{ width: 300, height: 50, backgroundColor: "#e8eaed" }}
        />

      </Card>
      <ButtonComponent title="Agregar" onPress={addData} />

    </View>
  );
}