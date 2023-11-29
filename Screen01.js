import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Screen01() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: tasks.length + 1,
        text: newTask,
      },
    });
    resetForm();
  };

  const handleUpdateTask = () => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: selectedTask.id,
        text: newTask,
      },
    });
    resetForm();
  };

  const handleRemoveTask = (taskId) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: taskId,
    });
  };

  const handleSelectTask = (id) => {
    const selected = tasks.find((task) => task.id === id);
    setSelectedTask(selected);
    setNewTask(selected.text);
  };

  const resetForm = () => {
    setNewTask("");
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <Text>{task.text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={() => handleSelectTask(task.id)}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveTask(task.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.formContainer}>
        <TextInput
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Enter task"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={selectedTask ? handleUpdateTask : handleAddTask}
          style={styles.submitButton}>
          <Text style={styles.buttonText}>{selectedTask ? "Update Task" : "Add Task"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#808080",
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#00FF00",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  submitButton: {
    backgroundColor: "green",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
