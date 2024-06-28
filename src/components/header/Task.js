import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateTaskModal from "../header/Updatemodall";
import "./Task.css";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/test");
        if (response.status === 200) {
          setTasks(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.log(err, "error getting data");
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/user/test/${id}`
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.log(err, "error deleting task");
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      color: task.color,
    });
    setCurrentTaskId(task._id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/test/${currentTaskId}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Updated successfully");
        setTasks(
          tasks.map((task) =>
            task._id === currentTaskId ? { ...task, ...formData } : task
          )
        );
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="task-container">
      {tasks.map((task) => (
        <Card key={task._id} className="custom-card">
          <Card.Body style={{ backgroundColor: task.color }}>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <div className="card-buttons">
              <Button
                variant="danger"
                className="custom-button"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                className="custom-button"
                onClick={() => handleEdit(task)}
              >
                Update
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <Button
        variant="success"
        className="create-button"
        onClick={() => navigate("/createtask")}
      >
        Create Task
      </Button>

      <UpdateTaskModal
        show={showModal}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
        formData={formData}
      />
    </div>
  );
}

export default Task;
