// import React, {useState} from 'react';

// function Form(props) {
//   const [chore, setChore] = useState(
//      {
//         task: "",
//         date: "",
//      }
//   );

  // function submitForm() {
  //   props.handleSubmit(chore);
  //   setChore({task: '', date: ''});
  // }



//   function handleChange(event) {
//     const { name, value } = event.target;
//     if (name === "date")
//       setChore(
//          {task: chore['task'], date: value}
//       );
//     else     
//        setChore(
//          {task: value, date: chore['date']}   
//        );
//   }


//   return (
//         <form>
//         <label htmlFor="task">Task</label>
//         <input
//             type="text"
//             name="task"
//             id="name"
//             value={chore.task}
//             onChange={handleChange} />
//         <label htmlFor="date">Date</label>
//         <input
//             type="text"
//             name="date"
//             id="job"
//             value={chore.date}
//             onChange={handleChange} />
//         <input type="button" value="Post" onClick={submitForm} />
//         </form>
//     );

// }

// export default Form;

// import React, { useState } from 'react';

// export function Form(props) {
//     const [chore, setChore] = useState({
//         task: "",
//         date: ""
//     });

//     function submitForm() {
//         props.handleSubmit(chore);
//         setChore({ task: '', date: '' });
//     }

//     function handleChange(event) {
//         const { name, value } = event.target;
//         if (name === "date")
//             setChore(
//                 { task: chore['task'], date: value }
//             );
//         else
//             setChore(
//                 { task: value, date: chore['date'] }
//             );
//     }

//     return (
//         <form onSubmit={submitForm}>
//             <input
//                 type="text"
//                 name="task"
//                 value={chore.task}
//                 onChange={handleChange}
//                 className="rectangle-2"
//             />
//             <input
//                 type="date"
//                 name="date"
//                 value={chore.date}
//                 onChange={handleChange}
//                 className="rectangle-3"
//             />
//             <input type="button" value="Post" onClick={submitForm} />
//         </form>
//     );
// }


import React, { useState } from 'react';

export function Form(props) {
    const [chore, setChore] = useState({
        task: "",
        date: ""
    });

    function submitForm(event) {
        event.preventDefault(); /* prevent default form submission was running into errors when refreshing*/ 

        if (props.handleSubmit) {
            props.handleSubmit(chore);
        }

        setChore({ task: '', date: '' });
    }

  
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "date") {
            setChore({ task: chore['task'], date: value });
        } else {
            setChore({ task: value, date: chore['date'] });
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
                value={chore.date}
                onChange={handleChange}
                className="rectangle-3"
            />
            <input type="submit" value="Post" />
        </form>
    );
}

export default Form;

