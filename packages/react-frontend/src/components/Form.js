import React, { useState, useEffect } from 'react';

function Form(props) {
  const connection_URL = "http://localhost:8000";

  const [chore, setChore] = useState({
    task: "",
    dueDate: "",
    assignee: "",
    weight: ""
  });

  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    getGroupInfo();
  }, []);

  function getGroupInfo() {
    fetch(`${connection_URL}/groupInfo`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('groupInfo: ', data);
        setGroupMembers(data.members);
      })
      .catch((error) => {
        console.error('ERROR: ', error);
      });
  }

  function submitForm() {
    props.handleSubmit(chore);
    setChore({ task: '', dueDate: '', assignee: '', weight: '' });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setChore(prevChore => ({
      ...prevChore,
      [name]: value
    }));
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="task"
        value={chore.task}
        onChange={handleChange}
        className="task-field"
      />
      <input
        type="date"
        name="date"
        value={chore.dueDate}
        onChange={handleChange}
        className="duedate-field"
      />
      <input
        type="number"
        name="weight"
        id="weight"
        value={chore.weight}
        onChange={handleChange}
        className="weight-field"
      />
      <select
        name="assignee"
        value={chore.assignee}
        onChange={handleChange}
        className="assignee-field"
      >
        <option value="">Select Assignee</option>
        {groupMembers.map(member => (
          <option key={member.username} value={member.username}>
            {member.username}
          </option>
        ))}
      </select>
      <input type="submit" className="task-submit" value="Post" />
    </form>
  );
}

export default Form;
