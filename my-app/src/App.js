import { useState,useEffect } from "react";
import './App.css';
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
  };

  const updateTask = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {student: newStudent, email: newEmail, link: newLink}
    await updateDoc(userDoc, newFields);
  };

  const deleteTask = async (id) =>{
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
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
      <input placeholder="Task..." onChange={(event) => {setNewTask(event.target.value)}}/>
      <input placeholder="Time Limit..." onChange={(event) => {setNewTimeLimit(event.target.value)}}/>
      <input placeholder="Summary..." onChange={(event) => {setNewSummary(event.target.value)}}/>
      <input placeholder="Compensation..." onChange={(event) => {setNewCompensation(event.target.value)}}/>
      <button onClick={createTask}>Create Task</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Task: {user.task}</h1>
            <h1>Student: {user.student}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Link: {user.link}</h1>
            <h2>Time Limit: {user.timelimit}</h2>
            <p>Summary: {user.summary} </p> 
            <h1>Compensation: {user.compensation}</h1>
            <input placeholder="Student..." onChange={(event) => {setNewStudent(event.target.value)}}/>
            <input placeholder="Email..." onChange={(event) => {setNewEmail(event.target.value)}}/>
            <input placeholder="Link..." onChange={(event) => {setNewLink(event.target.value)}}/>
            <button onClick={() => {updateTask(user.id)}}>Want to do this task?</button>
            <button onClick={() => {deleteTask(user.id)}}>Delete Task</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
