// src/TaskStack.js
import React from "react";

// src/TaskStack.js
function TaskListHead() {
  return (
    <thead>
      <tr>
        <th>MY TODO LIST:</th>
      </tr>
    </thead>
  );
}

function TaskList(props) {
  const boxes = props.characterData.map((box, index) => {
    return (
    <div class='chore-box' key={index}>
      <div class='chore-name'>TASK: {box.task}</div>
      <div class='chore-date'>DEADLINE: {box.date}</div>
      <div class='chore-id'>{box.id}</div>
      <div class='button-container'>
        <div class='claim-button'>
          <button onClick={() => 
            props.removeCharacter(index)}>
            Claim
          </button>
        </div>
        <div class='complete-button'>
          <button onClick={() => 
            props.removeCharacter(index)}>
            Complete
          </button>
        </div>
      </div>
    </div>

    );
   }
  );
  return (
      <tbody>
        {boxes}
       </tbody>
   );
}

function Stack (props) {
  return (
    <div class='box-container'>
      <TaskListHead />
      <TaskList characterData={props.characterData} 
	      removeCharacter={props.removeCharacter} />
    </div>
  );
}

export default Stack;
