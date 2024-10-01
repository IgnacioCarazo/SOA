import React, { useState } from "react";
import "./Task.css";

// Define the type for task props
interface TaskProps {
  id: number;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
  updateTask: (
    id: number,
    newTitle: string,
    newDescription: string
  ) => Promise<void>; // Promise-based update
  deleteTask: (id: number) => Promise<void>; // Promise-based delete
  updateStatus: (
    id: number,
    newStatus: "to-do" | "in-progress" | "done"
  ) => Promise<void>; // Promise-based update for status
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  updateTask,
  deleteTask,
  updateStatus,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Handles updating the task title and description
  const handleEdit = async () => {
    if (newTitle.trim() !== "" && newDescription.trim() !== "") {
      await updateTask(id, newTitle, newDescription); // Wait for the API call to finish
      setIsEditing(false); // Exit edit mode
    }
  };

  // Handles moving the task left or right by updating its status
  const handleMove = async (direction: "left" | "right") => {
    let newStatus: "to-do" | "in-progress" | "done" = status;

    if (direction === "left") {
      if (status === "in-progress") newStatus = "to-do";
      else if (status === "done") newStatus = "in-progress";
    } else if (direction === "right") {
      if (status === "to-do") newStatus = "in-progress";
      else if (status === "in-progress") newStatus = "done";
    }

    await updateStatus(id, newStatus); // Await the API call to finish
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task Title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{title}</strong>
          <p>{description}</p>
          <div className="task-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(id)}>Delete</button>
            <div className="arrow-buttons">
              <button
                onClick={() => handleMove("left")}
                disabled={status === "to-do"}
              >
                &lt; {/* Left Arrow */}
              </button>
              <button
                onClick={() => handleMove("right")}
                disabled={status === "done"}
              >
                &gt; {/* Right Arrow */}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
