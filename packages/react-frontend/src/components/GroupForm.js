import React, {useState} from 'react';

function GroupForm(props) {
  const [group, setGroup] = useState(
     {
        groupCode: ""
     }
  );

  function submitGroupForm() {
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
        <input type="submit" value="Post" className="group-submit" onClick={submitGroupForm}/>
        </form>
    );

}

export default GroupForm;