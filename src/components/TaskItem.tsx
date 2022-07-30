import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  Image, 
  TouchableOpacity, 
  View, 
  TextInput, 
  StyleSheet, 
  } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps{
  item:  Task;
  index: number;
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void
}

export function TaskItem({
  item, index, toggleTaskDone, removeTask, editTask}: TaskItemProps){

    const [isItemEditing, setIsItemEditing] = useState(false)
    const [newTitleTask, setNewTitleTask] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
      if (textInputRef.current) {
        if (isItemEditing) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [isItemEditing])

    function handleStartEditing(){
      setIsItemEditing(true)
    }

    function handleCancelEditing(){
      setIsItemEditing(false)
      setNewTitleTask(item.title)
    }

    function handleSubmitEditing(){
      editTask(item.id, newTitleTask)
      setIsItemEditing(false)
    }

    return (
      <Fragment>
        <View>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(item.id)}
          >
            <View 
              testID={`marker-${index}`}
              style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              { item.done && (
                <Icon 
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            <TextInput
              ref={textInputRef}
              value={newTitleTask}
              onChangeText={setNewTitleTask}
              editable={true}
              onSubmitEditing={handleSubmitEditing}
              style={item.done ? styles.taskTextDone : styles.taskText
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          {!isItemEditing && 
            (
              <TouchableOpacity
              testID={`edit-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={handleStartEditing}
              //onPress={() => editTask(item.id, )}
            >
              <Icon name='edit' size={20} color="#1DB863"  />
              </TouchableOpacity>
            )
          }

          {isItemEditing && 
            (
            <View style={styles.editButtons}>
              <TouchableOpacity
              testID={`edit-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={handleSubmitEditing}
              >
                <Icon name='check' size={20} color="#1DB863"  />
              </TouchableOpacity>
              <TouchableOpacity
                testID={`edit-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={handleCancelEditing}
              >
                <Icon name='x' size={20} color="#919090"  />
              </TouchableOpacity>
            </View>
            )
          }
        
          <TouchableOpacity
          testID={`trash-${index}`}
          style={isItemEditing ? styles.disabled : styles.notDisbabled}
          disabled={isItemEditing}
          onPress={() => removeTask(item.id)}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        </View>
      </Fragment>
  )
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#2d2d2d',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },

  buttons:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'flex-end'
  },
  disabled:{
    opacity: 0.2,
    paddingHorizontal: 24
  },
  notDisbabled:{
    opacity: 1,
    paddingHorizontal: 24
  },
  editButtons: {
    flexDirection: 'row',
  }
})