import React, {useState} from 'react';

function Form(props) {
  const [chore, setChore] = useState(
     {
        task: "",
        date: "",
     }
  );

  function submitForm() {
    props.handleSubmit(chore);
    setChore({task: '', date: ''});
  }



  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "date")
      setChore(
         {task: chore['task'], date: value}
      );
    else     
       setChore(
         {task: value, date: chore['date']}   
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
        <label htmlFor="date">Date</label>
        <input
            type="text"
            name="date"
            id="job"
            value={chore.date}
            onChange={handleChange} />
        <input type="button" value="Post" onClick={submitForm} />
        </form>
    );

}

export default Form;