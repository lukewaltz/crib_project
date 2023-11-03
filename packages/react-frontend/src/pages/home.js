// import React from "react";
// import { useState } from "react";
// import Stack from "../components/TaskStack";
// import {Form} from "../components/Form";
 
// const Home = () => {
//     const [tasks, setTasks] = useState([]);

//     function removeOneTask (index) {
// 	    const updated = tasks.filter((task, i) => {
// 	        return i !== index
// 	    });
// 	  setTasks(updated);
// 	  }

//   // TASK OPERATIONS

//   // post task
//   function postTask(chore){
//     const taskData = { task: chore};

//     fetch("http://localhost:8000/tasks", 
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application.json",
//       },
//       body: JSON.stringify(taskData),
//     })
//     .then((response) => {
//       if (response.status === 201) {
//         // Task added successfully
//         console.log('Task added successfully');
//         return response.json();
//       } else if (response.status === 500) {
//         // Could not add task, handle as needed
//         console.log('Could not add task');
//         throw new Error('Could not add task');
//       } else {
//         // Handle other responses as needed
//         throw new Error('Task could not be added');
//       }
//     })
//     .then((task) => {
//       // Update your component state with the added task
//       setTasks([...tasks, task]);
//     })
//     .catch((error) => {
//       console.error(error);
//       // Handle error
//     });
//   }

//   // fetch tasks
//   function fetchTasks() {
//     const promise = fetch("http://localhost:8000/tasks");
//      return promise;
// } 

// // delete task
// function deleteTask(_id) {
//   const removeURI = `${"http://localhost:8000/tasks/"}${_id}`;
//   const promise = fetch(removeURI, {
//       method: "DELETE",
//       headers: {
//           "Content-Type": "application/json",
//       }
//   });
//   return promise;
// }

// // function updateList(chore) {
// //   postTask(chore)
// //     .then(setTasks([...tasks, chore]))
// //     .catch(error => {console.log(error);});
// // }

// function updateList(chore) {
//   postTask(chore)
//     .then(() => {
//       // The API call was successful, so update the tasks state
//       setTasks([...tasks, chore]);
//     })
//     .catch(error => {
//       console.log(error);
//       // Handle the error, if needed
//     });
// }

//   return (
//       <div className="container">
//       <Form handleSubmit={updateList} />
//       {/* <Table characterData={characters} 
//       removeCharacter={removeOneCharacter} /> */}
//       <Stack taskData={tasks} 
//       removeTask={removeOneTask} />
//   </div>
//   );
// };
 
// export default Home;



// import React from "react";
// import { useState } from "react";
// import Stack from "../components/TaskStack";
// import Form from "../components/Form";
// import "./style.css";

 
// const Home = () => {
//   const [tasks, setTasks] = useState([]);

//   function removeOneTask (index) {
//     const updated = tasks.filter((task, i) => {
//         return i !== index
//     });
//   setTasks(updated);
//   }

//   function postTask(chore){
//     const taskData = { task: chore};

//     fetch("http://localhost:8000/tasks", 
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application.json",
//       },
//       body: JSON.stringify(taskData),
//     })
//     .then((response) => {
//       if (response.status === 201) {
//         // Task added successfully
//         console.log('Task added successfully');
//         return response.json();
//       } else if (response.status === 500) {
//         // Could not add task, handle as needed
//         console.log('Could not add task');
//         throw new Error('Could not add task');
//       } else {
//         // Handle other responses as needed
//         throw new Error('Task could not be added');
//       }
//     })
//     .then((task) => {
//       // Update your component state with the added task
//       setTasks([...tasks, task]);
//     })
//     .catch((error) => {
//       console.error(error);
//       // Handle error
//     });
//   }

//     // fetch tasks
//     function fetchTasks() {
//       const promise = fetch("http://localhost:8000/tasks");
//        return promise;
//   } 

//   // delete task
//   function deleteTask(_id) {
//     const removeURI = `${"http://localhost:8000/tasks/"}${_id}`;
//     const promise = fetch(removeURI, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     });
//     return promise;
//   }

  

//   function updateList(chore) {
//     postTask(chore)
//       .then(() => {
//         // The API call was successful, so update the tasks state
//         setTasks([...tasks, chore]);
//       })
//       .catch(error => {
//         console.log(error);
//         // Handle the error, if needed
//       });
//   }

  
  


//     // return (
//     //     <div className="container">
//     //     <Form handleSubmit={updateList} />
//     //     {/* <Table characterData={characters} 
//     //     removeCharacter={removeOneCharacter} /> */}
//     //     <Stack characterData={characters} 
//     //     removeCharacter={removeOneCharacter} />
//     // </div>
//     // );
//     return (
//       <div className="home-page">

        
//           <div className="div">
//               <div className="overlap">
//                   <div className="group">
//                       <img className="logo-group" alt="Logo group" src="logo-group.png" />
//                   </div>re
//                   <div className="overlap-group">
//                       <img className="vector" alt="Vector" src="vector.svg" />
//                   </div>
//               </div>
//               <div className="rectangle-4" />
//               <div className="rectangle-5" />
//               <div className="rectangle-6" />
//               <div className="overlap-group-wrapper">
//                   <div className="div-wrapper">
//                       <div className="text-wrapper">HISTORY</div>
//                   </div>
//               </div>
//               <div className="text-wrapper-2">HOME</div>
//           </div>
//       </div>
//   );
// };
 
// export default Home;


// Home.js
// Home.js
import React, {useState, useEffect} from 'react';
import Stack from "../components/TaskStack"; // Ensure correct import path
import "./style.css";

function Home() {

    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        listTasks()
        .then((res)=>res.json())
        .then((json) => setTasks(json["task_list"]))
        .catch((error) => {console.log(error);});
    }, []);

    function listTasks(){
        const promise = fetch("http://localhost:8000/tasks");
        return promise;
    }
    
    function completeTask(){

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
            {/* Rectangle elements as placeholders
            <div className="rectangle-4" />
            <div className="rectangle-5" />
            <div className="rectangle-6" /> */}
            {/* tasks are displayed here */}
            <div className="rectangle-tasks">
            <Stack taskData={tasks} />
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

    function TaskList(props) {
  const boxes = props.taskData.map((box, index) => {
    return (
      <div className='chore-box' key={index}>
        <div className='chore-name'>TASK: {box.task}</div>
        <div className='chore-date'>DEADLINE: {box.dueDate}</div>
        <div className='chore-id'>{box.id}</div>
        <div className='button-container'>
          <div className='claim-button'>
            {/* <button onClick={() => props.claimTask(box.id)}> */}
            <button onClick={() => props.removeTask(index)}>
              Claim
            </button>
          </div>
          <div className='complete-button'>
            {/* <button onClick={() => props.completeTask(box.id)}> */}
            <button onClick={() => props= props.filter((task) => task.task === box.task)}>
              Complete
            </button>
          </div>
        </div>
      </div>
    );
  });
    
};

export default Home;

