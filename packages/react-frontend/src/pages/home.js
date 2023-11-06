import React, { useState, useEffect } from 'react';
import "./home.css";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    listTasks()
      .then(res => res.json())
      .then(json => setTasks(json["task_list"]))
      .catch(error => console.log(error));
  }, []);

  function listTasks(){
    const promise = fetch("http://localhost:8000/tasks");
    return promise;
}

  function completeTask(taskId) {
    deleteTaskFromBackend(taskId)
      .then(() => {
        //keep all tasks that don't match task id
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  }
  
  function removeTask(taskId) {
    deleteTaskFromBackend(taskId)
      .then(() => {
        //keep all tasks that don't match task id
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  }
  
  function deleteTaskFromBackend(taskId) {
    return fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Task with ID ${taskId} deleted successfully`);
    });
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
      const boxes = tasks.map((box) => {
        return (
          <div className='chore-box' key = {box._id} >
            <div className='chore-name'>TASK: {box.task}</div>
            <div className='chore-date'>DEADLINE: {box.dueDate}</div>
            {/* <div className='chore-id'>{box._id}</div> */}
            <div className='button-container'>
              <div className='claim-button'>
                <button onClick={() => removeTask(box._id)}>
                  Claim
                </button>
              </div>
              <div className='complete-button'>
                <button onClick={() => completeTask(box._id)}>
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
