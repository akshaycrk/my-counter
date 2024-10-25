import React, { useEffect, useState } from 'react';
import List from "./components/List";
import axios from "axios";
import { baseURL } from './utils/constant';

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get(`${baseURL}/get`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err.response || err);
      });
  }, [updateUI]);

  const addTask = () => {
    // Ensure input is not empty before adding a task
    if (!input.trim()) {
      alert("Please enter a task");
      return;
    }

    axios.post(`${baseURL}/save`, { task: input })
      .then((res) => {
        setInput("");  // Clear input after adding the task
        setUpdateUI((prevState) => !prevState);  // Trigger UI update
      })
      .catch((err) => {
        console.error("Error adding task:", err.response || err);
      });
  };

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    if (!input.trim()) {
      alert("Please enter a task to update");
      return;
    }

    axios.put(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        setUpdateUI((prevState) => !prevState);  // Trigger UI update
        setUpdateId(null);  // Reset update mode
        setInput("");  // Clear input after update
      })
      .catch((err) => {
        console.error("Error updating task:", err.response || err);
      });
  };

  return (
    <main>
      <h1 className='title'>CRUD Operation</h1>

      <div className='input_holder'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
