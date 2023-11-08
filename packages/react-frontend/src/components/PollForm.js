import React, {useState} from 'react';

function PollForm(props) {
  const [poll, setPoll] = useState(
     {
        title: "",
        option1: "",
        option2: ""
     }
  );

  function submitForm() {
    props.handleSubmit(poll);
    setPoll({title: '', option1: '', option2: ''});
  }



  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title")
      setPoll(
         {title: value, option1: poll['option1'], option2: poll['option2']}
      );
    else if (name === "option1")
    setPoll(
        {title: poll['title'], option1: value, option2: poll['option2']}
     );
    else if (name === "option2")
    setPoll(
        {title: poll['title'], option1: poll['option1'], option2: value}
     );
  }


  return (
        <form>
        <label htmlFor="title">Title</label>
        <input
            type="text"
            name="title"
            id="title"
            value={poll.title}
            onChange={handleChange} />
        <label htmlFor="option1">Option 1</label>
        <input
            type="text"
            name="option1"
            id="option1"
            value={poll.option1}
            onChange={handleChange} />
        <label htmlFor="option2">Option 2</label>
        <input
            type="text"
            name="option2"
            id="option2"
            value={poll.option2}
            onChange={handleChange} />
        <input type="button" value="Post" onClick={submitForm} />
        </form>
    );

}

export default PollForm;