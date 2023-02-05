import { useState,useEffect } from "react";
import { Button, TextField, Heading, ThemeProvider, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import './App.css';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function App() {
  const [newTask, setNewTask] = useState("")
  const [newStudent, setNewStudent] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newLink, setNewLink] = useState("")
  const [newTimeLimit, setNewTimeLimit] = useState("")
  const [newSummary, setNewSummary] = useState("")
  const [newCompensation, setNewCompensation] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createTask = async () => {
    await addDoc(usersCollectionRef, {task: newTask, timelimit:newTimeLimit, summary:newSummary, compensation:newCompensation})
    window.location.reload(false);
  };

  const updateTask = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {student: newStudent, email: newEmail, link: newLink}
    await updateDoc(userDoc, newFields);
    window.location.reload(false);
  };

  const deleteTask = async (id) =>{
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    window.location.reload(false);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="App">
      <Heading>Task Creation</Heading>
      <TextField size="small" placeholder="Task Name" onChange={(event) => {setNewTask(event.target.value)}}/>
      <TextField size="small" placeholder="Time Limit" onChange={(event) => {setNewTimeLimit(event.target.value)}}/>
      <TextField size="small" placeholder="Task Summary" onChange={(event) => {setNewSummary(event.target.value)}}/>
      <TextField size="small" placeholder="Compensation" onChange={(event) => {setNewCompensation(event.target.value)}}/>
      <br></br>
      <Button onClick={createTask}>Create Task</Button>
      <br></br>
      <br></br>
      <Heading>Task View</Heading>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <Text>Task Name: {user.task}</Text>
            <Text>Student Name: {user.student}</Text>
            <Text>Student Email: {user.email}</Text>
            <Text>Submission Link: {user.link}</Text>
            <Text>Time Limit: {user.timelimit}</Text>
            <Text>Task Summary: {user.summary} </Text> 
            <Text>Compensation: {user.compensation}</Text>
            <TextField placeholder="Student Name" onChange={(event) => {setNewStudent(event.target.value)}}/>
            <TextField placeholder="Student Email" onChange={(event) => {setNewEmail(event.target.value)}}/>
            <TextField placeholder="Submission Link" onChange={(event) => {setNewLink(event.target.value)}}/>
            <br></br>
            <Button onClick={() => {updateTask(user.id)}}>Accept Task</Button>
            <Button onClick={() => {deleteTask(user.id)}}>Delete Task</Button>
            <br></br>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default App;
