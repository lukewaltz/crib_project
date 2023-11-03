import React, {useState} from 'react';

function Form(props) {
  const [chore, setChore] = useState(
     {
        task: "",
        dueDate: "",
        weight: ""
     }
  );

  function submitForm() {
    props.handleSubmit(chore);
    setChore({task: '', dueDate: '', weight: ''});
  }



  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "dueDate")
      setChore(
         {task: chore['task'], dueDate: value, weight: chore['weight']}
      );
    else if (name === "task")
       setChore(
         {task: value, dueDate: chore['dueDate'], weight: chore['weight']}   
       );
    else if (name === "weight")
        setChore(
          {task: chore['task'], dueDate: chore['dueDate'], weight: value}
        );
  }


  return (
        <form>
        <label htmlFor="task">Task</label>
        <input
            type="text"
            name="task"
            id="name"
            value={chore.task}
            onChange={handleChange} />
        <label htmlFor="dueDate">Date</label>
        <input
            type="text"
            name="dueDate"
            id="date"
            value={chore.dueDate}
            onChange={handleChange} />
        <label htmlFor="weight">Weight</label>
        <input
            type="number"
            name="weight"
            id="weight"
            value={chore.weight}
            onChange={handleChange} />
        <input type="button" value="Post" onClick={submitForm} />
        </form>
    );

}

export default Form;