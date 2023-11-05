import React, { useState, useEffect } from 'react';
import "./style.css";
import "../index.css";
import Form from "../components/Form";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    listTasks()
      .then(res => res.json())
      .then(json => setTasks(json["task_list"]))
      .catch(error => console.log(error));
  }, []);

  function listTasks() {
    return fetch("http://localhost:8000/tasks");
  }

  function completeTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function removeTask(index) {

  }

    // merged tasklisthead component
    function TaskListHead() {
        return (
            <thead>
                <tr>
                    <th>LIST OF CHORES:</th>
                </tr>
            </thead>
        );
    }

    // merged tasklist component
    function TaskList() {
      const boxes = tasks.map((box, index) => {
        return (
          <div className='chore-box' key={index}>
            <div className='chore-name'>TASK: {box.task}</div>
            <div className='chore-date'>DEADLINE: {box.dueDate}</div>
            <div className='chore-id'>{box.id}</div>
            <div className='button-container'>
              <div className='claim-button'>
                {/* <button onClick={() => props.claimTask(box.id)}> */}
                <button onClick={() => removeTask(index)}>
                  Claim
                </button>
              </div>
              <div className='complete-button'>
                {/* <button onClick={() => props.completeTask(box.id)}> */}
                <button onClick={() => completeTask(box.id)}>
                  Complete
                </button>
              </div>
            </div>
          </div>
        );
      });
      return (
        <div>
          {boxes}
        </div>
      );
    }

    function Stack(props) {
        return (
            <div className='box-container'>
                <TaskListHead />
                <TaskList 
                    taskData={tasks} 
                    removeTask={removeTask} 
                    completeTask={completeTask}
                />
            </div>
        );
    }

    return (
        <div className="home-page">
            <div className="div">
                <div className="overlap">
                    <div className="group">
                        <img className="logo-group" alt="Logo group" src="logo-group.png" />
                    </div>
                    <div className="overlap-group">
                        <img className="vector" alt="Vector" src="vector.svg" />
                    </div>
                </div>
                <div className="rectangle-tasks">
                    <Stack 
                        taskData={tasks} 
                        removeTask={removeTask} 
                        completeTask={completeTask} 
                    />
                </div>
                <div className="overlap-group-wrapper">
                    <div className="div-wrapper">
                        <div className="text-wrapper">HISTORY</div>
                    </div>
                </div>
                <div className="text-wrapper-2">HOME</div>
            </div>
        </div>
    );
}

export default Home;
