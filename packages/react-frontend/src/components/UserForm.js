import React, {useState} from 'react';

function UserForm(props) {
  const [user, setUser] = useState(
     {
        username: "",
        name: "",
        email: "",
     }
  );

  function submitForm() {
    props.handleSubmit(user);
    setUser({username: '', name: '', email: ''});
  }


  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name")
      setUser(
         {username: user['username'], name: value, email: user['email']}
      );
    else if (name === "username")    
       setUser(
         {username: value, name: user['name'], email: user['email']}   
       );
    else
        setUser(
            {username: user['username'], name: user['name'], email: value}
        );
  }


  return (
        <form>
        <label htmlFor="username">Username</label>
        <input
            type="text"
            name="Username"
            id="username"
            value={user.username}
            onChange={handleChange} />
        <label htmlFor="name">Name</label>
        <input
            type="text"
            name="Name"
            id="name"
            value={user.name}
            onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input
            type="text"
            name="Email"
            id="email"
            value={user.email}
            onChange={handleChange} />
        <input type="button" value="Login" onClick={submitForm} />
        </form>
    );

}

export default UserForm;