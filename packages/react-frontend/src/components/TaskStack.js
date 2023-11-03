import React from "react";

function TaskListHead() {
  return (
    <thead>
      <tr>
        <th>LIST OF CHORES:</th>
      </tr>
    </thead>
  );
}

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
        taskData={props.taskData}
        removeTask={props.removeTask}
        // claimTask={props.claimTask}
        // completeTask={props.completeTask}
      />
    </div>
  );
}

export default Stack;
