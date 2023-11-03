import React from "react";
import { useState } from "react";
import Stack from "../components/TaskStack";
import Form from "../components/Form";
 
const Home = () => {
    const [tasks, setTasks] = useState([]);

    function removeOneTask (index) {
	    const updated = tasks.filter((task, i) => {
	        return i !== index
	    });
	  setTasks(updated);
	  }

  // TASK OPERATIONS

  // post task
  function postTask(chore){
    console.log("in posttask");
    const taskData = { task: chore};

    const promise = fetch("http://localhost:8000/tasks", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify(taskData),
    })
    .then((response) => {
      if (response.status === 201) {
        // Task added successfully
        console.log('Task added successfully');
        return response.json();
      } else if (response.status === 500) {
        // Could not add task, handle as needed
        console.log('Could not add task');
        throw new Error('Could not add task');
      } else {
        // Handle other responses as needed
        throw new Error('Task could not be added');
      }
    })
    .then((task) => {
      // Update your component state with the added task
      console.log('Task data posted');
      setTasks([...tasks, task]);
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
    return promise;
  }

  // fetch tasks
  function fetchTasks() {
    const promise = fetch("http://localhost:8000/tasks");
     return promise;
} 

// delete task
function deleteTask(_id) {
  const removeURI = `${"http://localhost:8000/tasks/"}${_id}`;
  const promise = fetch(removeURI, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      }
  });
  return promise;
}

// function updateList(chore) {
//   postTask(chore)
//     .then(setTasks([...tasks, chore]))
//     .catch(error => {console.log(error);});
// }

function updateList(chore) {
  postTask(chore)
    .then(() => {
      // The API call was successful, so update the tasks state
      setTasks([...tasks, chore]);
    })
    .catch(error => {
      console.log(error);
      // Handle the error, if needed
    });
}

  return (
      <div className="container">
      <Form handleSubmit={updateList} />
      {/* <Table characterData={characters} 
      removeCharacter={removeOneCharacter} /> */}
      <Stack taskData={tasks} 
      removeTask={removeOneTask} />
  </div>
  );
};
 
export default Home;