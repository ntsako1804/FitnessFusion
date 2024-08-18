import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { startOfWeek, addDays, format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Function to get the days of the current week
const getDaysOfWeek = () => {
  const start = startOfWeek(new Date());
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

// Function to format dates
const formatDate = (date) => format(date, 'EEEE');

const TaskApp = ({ route, navigation }) => {
  const { user_id } = route.params;
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selectedHour, setSelectedHour] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user_id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, [user_id]);

  const handleAddTask = async () => {
    if (input.trim()) {
      const newTask = { 
        title: input, 
        time: selectedHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        date: selectedDate.toDateString(), 
        completed: false, 
        userId: user_id 
      };
      await addDoc(collection(db, "tasks"), newTask);
      setInput('');
    }
  };

  const handleEditTask = async () => {
    if (input.trim()) {
      const taskDoc = doc(db, "tasks", editingTaskId);
      await updateDoc(taskDoc, { 
        title: input, 
        time: selectedHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        date: selectedDate.toDateString() 
      });
      setEditingTaskId(null);
      setInput('');
    }
  };

  const handleToggleTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    const task = tasks.find(task => task.id === id);
    await updateDoc(taskDoc, { completed: !task.completed });
  };

  const startEditing = (task) => {
    setInput(task.title);
    setSelectedHour(new Date(`1970-01-01T${task.time}:00`));
    setSelectedDate(new Date(task.date));
    setEditingTaskId(task.id);
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setSelectedHour(time);
    hideTimePicker();
  };

  const daysOfWeek = getDaysOfWeek();

  const getSortedTasks = () => {
    return tasks
      .filter(task => task.date === selectedDate.toDateString())
      .sort((a, b) => new Date(`1970-01-01T${a.time}:00`) - new Date(`1970-01-01T${b.time}:00`));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Schedule</Text>
      <Text style={styles.date}>{selectedDate.toDateString()}</Text>
      <ScrollView horizontal contentContainerStyle={styles.datePickerContainer}>
        {daysOfWeek.map((date, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDate(date)}>
            <Text style={[
              styles.datePickerItem,
              selectedDate.toDateString() === date.toDateString() && styles.selectedDatePickerItem
            ]}>
              {formatDate(date)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>{selectedHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter your task"
        onSubmitEditing={editingTaskId ? handleEditTask : handleAddTask}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={editingTaskId ? handleEditTask : handleAddTask}
      >
        <Text style={styles.addButtonText}>{editingTaskId ? "Edit Task" : "Add Task"}</Text>
      </TouchableOpacity>
      <FlatList
        data={getSortedTasks()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={[styles.taskButton, item.completed && styles.completedButton]}
              onPress={() => handleToggleTask(item.id)}
            >
              <Text style={styles.item}>
                {item.completed ? '✓' : '✗'} {`${item.time} - ${item.title}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => startEditing(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101629',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  datePickerContainer: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  datePickerItem: {
    padding: 10,
    marginHorizontal: 5,
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#333',
  },
  selectedDatePickerItem: {
    backgroundColor: '#1E90FF',
  },
  timeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginRight: 10,
  },
  completedButton: {
    backgroundColor: '#007bff',
  },
  item: {
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default TaskApp;
