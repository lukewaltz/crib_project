import React, {useState} from 'react';

function GroupCodeForm(props) {
  const [group, setGroup] = useState(
     {
        groupCode: ""
     }
  );

  function submitGroupCodeForm() {
    props.handleSubmit(group);
    setGroup({groupCode: ''});
  }

  function handleChange(event) {
    const { value } = event.target;
      setGroup(
         {groupCode: value}
      );
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