import React, {useState} from 'react';

function GroupNameForm(props) {
  const [group, setGroupName] = useState("");

  function submitGroupNameForm(event) {
    event.preventDefault();
    props.handleSubmit(group);
  }


  function handleChange(event) {
    const { value } = event.target;
      setGroupName(value);
    }


  return (
        <form>
        <input
            type="text"
            name="groupName"
            id="groupName"
            value={group.groupName}
            onChange={handleChange} 
            className="title2-field"
            />
        <input type="submit" value="Submit" className="group-submit" onClick={submitGroupNameForm}/>
        </form>
    );

}

export default GroupNameForm;