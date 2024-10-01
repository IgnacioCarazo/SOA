import React, { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task"; // Import the Task component

interface Task {
  id: number;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  // Fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5001/tasks");
      const data = await response.json();
      console.log(data);
      setTasks(data);
      console.log(tasks);
    };
    fetchTasks();
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const addTask = async () => {
    if (taskTitle.trim() !== "" && taskDescription.trim() !== "") {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        status: "to-do",
      };
      const response = await fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const updateTaskStatus = async (
    taskId: number,
    newStatus: "in-progress" | "done" | "to-do"
  ) => {
    await fetch(`http://localhost:5001/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTask = async (
    id: number,
    newTitle: string,
    newDescription: string
  ) => {
    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="background">
      <div className="task-manager">
        <input
          type="text"
          value={taskTitle}
          onChange={handleTitleChange}
          placeholder="Task Title"
          className="task-input"
        />
        <textarea
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Task Description"
          className="task-description-input"
        />
        <button onClick={addTask} className="add-task-button">
          Add Task
        </button>
      </div>
      <div className="board">
        <div className="title">
          <h1>TECMaster</h1>
        </div>
        <div className="columns">
          <div className="to-do">
            <h2>To Do</h2>
            {tasks
              .filter((task) => task.status === "to-do")
              .map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  updateStatus={updateTaskStatus}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
          </div>
          <div className="in-progress">
            <h2>In Progress</h2>
            {tasks
              .filter((task) => task.status === "in-progress")
              .map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  updateStatus={updateTaskStatus}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
          </div>
          <div className="done">
            <h2>Done</h2>
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  updateStatus={updateTaskStatus}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
