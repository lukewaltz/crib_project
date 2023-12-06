import React, {useState} from 'react';

function GroupCodeForm(props) {
  const [group, setGroup] = useState("");

  function submitGroupCodeForm(event) {

    event.preventDefault();
    props.handleSubmit(group);
  }

  function handleChange(event) {
    const { value } = event.target;
      setGroup(value);
    }


  return (
        <form>
        <input
            type="text"
            name="groupCode"
            id="groupCode"
            value={group.groupCode}
            onChange={handleChange} 
            className="title2-field"
            />
        <input type="submit" value="Submit" className="group-submit" onClick={submitGroupCodeForm}/>
        </form>
    );

}

export default GroupCodeForm;