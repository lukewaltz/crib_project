import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';
import Navbar from './Navbar';



function MyApp() {
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
      <Navbar />
      <Form handleSubmit={updateList} />
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
    </div>
  )
}


export default MyApp;
