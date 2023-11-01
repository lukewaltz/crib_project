
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

  function updateList(chore) {
    setCharacters([...characters, chore]);
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