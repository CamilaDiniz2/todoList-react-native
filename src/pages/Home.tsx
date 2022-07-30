import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


interface TaskProps{
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isAEqualTask = tasks.find(
        task => 
          task.title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase())
    if (isAEqualTask !== undefined){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    } else{
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks((oldStage) => [...oldStage, newTask]);
    }
    
  }

  function handleToggleTaskDone(id: number) {
    const taskTest = tasks.map(task => {
      if (task.id === id){
        return{...task, done: !task.done}
      } else{
        return task
      }
    })
    setTasks(taskTest)
  }

  function handleRemoveTask(id: number) {
    const idFind = tasks.find(task => task.id === id);
    if (idFind !== undefined){
      Alert.alert(
        "Remover item",
        "Tem certeza que você deseja remover esse item?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirmar", 
          onPress: () => 
            setTasks(oldState => oldState.filter(task => task.id !== id)) }
        ]
      );
    }
    ;
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    console.log('Edit')
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})