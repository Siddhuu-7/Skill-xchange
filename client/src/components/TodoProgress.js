import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Todo = ({ handelCard, assignedTo, data }) => {
  const [showModal, setShowModal] = useState(true);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
    handelCard();
  };

  const handleAddTask = async () => {
    if (task.trim() === '') return;

    const newTask = { goals: task, complete: "pending" }; 
    setTasks((prevTasks) => [...prevTasks, newTask]);  
    setTask('');  

    const assignedBy = {
      name: localStorage.getItem('name'),
      _id: localStorage.getItem('Id')
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/goals/post`, {
        assignedBy,
        assignedTo,
        assignedGoal: { goals: task, complete: "pending" }
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async(index) => {
    const taskToDelete = tasks[index]; 
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/goals/delete/${taskToDelete._id}`)
    } catch (error) {
      console.log(error)
    }
    const newTasks = tasks.filter((_, i) => i !== index); 
    setTasks(newTasks);
  };
  

  const fetchAssignedTasks = async () => {
    try {
      if (!assignedTo) return;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetch/goals/${assignedTo}`);

      const formattedData = res.data.map((item) => ({
        assignedBy: item.assignedBy.name,
        assignedTo: item.assignedTo,
        tasks: item.assignedGoal.map((goal) => ({
          _id: goal._id, 
          task: goal.goals, 
          status: goal.complete
        }))
      }));

      setTasks(formattedData.flatMap(item => item.tasks)); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, [assignedTo,tasks]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-fixed top-0 start-0 bg-dark bg-opacity-50">
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Tasks</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              
              <div className="modal-body">
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    rows="3"
                  />
                </div>
                
                <button 
                  className="btn btn-primary w-100 mb-3" 
                  onClick={handleAddTask}
                >
                  Add Task
                </button>

                <div className="task-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {tasks.length > 0 ? (
                    <ul className="list-group">
                      {tasks.map((task, index) => (
                        <li 
                          key={index}
                          className={`list-group-item d-flex justify-content-between align-items-start ${
                            task.status === 'completed' ? 'list-group-item-success' : 'list-group-item-warning'
                          }`}
                        >
                          <div className="ms-2 me-auto" style={{ 
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            maxWidth: 'calc(100% - 80px)' 
                          }}>
                            {task.task}
                          </div>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTask(index)}
                            style={{ minWidth: '70px' }}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No tasks found.</p>
                  )}
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;