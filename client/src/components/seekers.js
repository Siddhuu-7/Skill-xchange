import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEye, FaTasks } from 'react-icons/fa';
import TodoApp from './TodoProgress';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoalIcon, CircleCheckBigIcon } from 'lucide-react';

export default function Seekers({ data }) {
    const [showToDo, setShowTODO] = useState(false);
    const [completedGoals, setCompletedGoals] = useState(0);
    const navigate = useNavigate();
    const [TotalGoal, setTotalGoal] = useState();
    const [status, setStatus] = useState(data.request);  
    const assignedTo = data.seekeingData._id;
    const profileInitial = data?.seekeingData.userName?.charAt(0).toUpperCase() || '?';
    const [checkComplete, setCompleted] = useState(false);

    const handelCard = () => {
        setShowTODO(false);
    };
    const handelComplete = () => {
        const isConfirmed = window.confirm("Are you sure about this?");
        if (isConfirmed) {
            setCompleted(!checkComplete); 
        } else {
            return;
        }
    };
    

    const handleAccept = async () => {
        const id = localStorage.getItem('Id');
        
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/seekAndSeeking/acceptRequest/${data.seekeingData._id}/${id}`);
            if (res.data.request === "accepted") {
                setStatus("accepted"); 
                
            }
        } catch (error) {
            console.error("Error accepting the seeker", error);
        }
    };

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetch/goals/${assignedTo}`);

                if (res.data.length > 0) {
                    let completedCount = 0;

                    res.data.forEach((item) => {
                        const completedGoals = item.assignedGoal.filter(goal => goal.complete === 'completed').length;
                        setTotalGoal(item.assignedGoal.length);
                        completedCount += completedGoals;
                    });

                    setCompletedGoals(completedCount);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchAssignedTasks();
    }, [assignedTo]);

    return (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="d-flex justify-content-center mt-4">
                <Card style={{ width: '30rem', position: 'relative' }}>
                    {data ? (
                        <>
                            <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                                <Button variant="link" onClick={() => navigate(`/publicprofile/${data.seekeingData._id}`)}>
                                    Profile <FaEye />
                                </Button>
                            </div>
                            <Card.Body>
                                <div className="align-items-center mb-3">
                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            fontSize: '24px',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {profileInitial}
                                    </div>
                                    <div className="ms-3">
                                        <Card.Title>{data.seekeingData.userName}</Card.Title>
                                    </div>
                                </div>

                                <div className="mt-2 d-flex justify-content-between w-100">
                                    <h6>{data.seekeingData.userName} has completed</h6>
                                    <div className="text-end">
                                        <h6>{completedGoals}/{TotalGoal} <GoalIcon /></h6>
                                    </div>
                                </div>

                                {checkComplete &&   <ul className="list-group">
                                    <li className="list-group-item list-group-item-success font-italic text-capitalize">
                                        "Great job, both of you are doing amazing work!"
                                    </li>
                                </ul>}
                                    <div>
                                        
                                    </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="primary" onClick={() => setShowTODO(true)}>
                                        Open To-Do <FaTasks />
                                    </Button>
                                    {status === "pending" && (
                                        <Button variant="success" onClick={handleAccept}>
                                            Accept <CircleCheckBigIcon />
                                        </Button>
                                    )}
                                    {status === "accepted" && (
                                        <Button variant="success" onClick={handelComplete}>
                                            Complete <CircleCheckBigIcon />
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </>
                    ) : (
                        <p>No accepted connections found</p>
                    )}
                </Card>
                {showToDo && status === "accepted" && <TodoApp handelCard={handelCard} assignedTo={assignedTo} />}
            </div>
        </motion.div>
    );
}
