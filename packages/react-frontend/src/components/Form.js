import React, { useState } from 'react';

export function Form(props) {
    const [chore, setChore] = useState({
        task: "",
        dueDate: ""
    });

    function submitForm(event) {
        event.preventDefault(); /* prevent default form submission was running into errors when refreshing*/ 

        if (props.handleSubmit) {
            props.handleSubmit(chore);
        }

        setChore({ task: '', dueDate: '' });
    }
  
  
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "date") {
            setChore({ task: chore['task'], dueDate: value });
        } else {
            setChore({ task: value, dueDate: chore['date'] });
        }
    }

    return (
        <form onSubmit={submitForm}>
            <input
                type="text"
                name="task"
                value={chore.task}
                onChange={handleChange}
                className="rectangle-2"
            />
            <input
                type="date"
                name="date"
                value={chore.dueDate}
                onChange={handleChange}
                className="rectangle-3"
            />
            <input type="submit" value="Post" />
        </form>
    );
}

export default Form;

