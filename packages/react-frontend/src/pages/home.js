
import React from "react";
import { useState } from "react";
import Stack from "../components/TaskStack";
import Form from "../components/Form";
 
const Home = () => {
    const [characters, setCharacters] = useState([]);
    function removeOneCharacter (index) {
	    const updated = characters.filter((character, i) => {
	        return i !== index
	    });
	  setCharacters(updated);
	}

  function postTask(chore){
    const taskData = { task: chore};

    fetch("http://localhost:8000/tasks", 
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
      setCharacters([...characters, task]);
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
  }

  function updateList(chore) {
    postTask(chore)
      .catch((error) => {console.log(error);})
      .then(setCharacters([...characters, chore]));
  }

    return (
        <div className="container">
        <Form handleSubmit={updateList} />
        {/* <Table characterData={characters} 
        removeCharacter={removeOneCharacter} /> */}
        <Stack characterData={characters} 
        removeCharacter={removeOneCharacter} />
    </div>
    );
};
 
export default Home;