import React, {useState} from 'react';
function UserForm(props) {
<<<<<<< HEAD
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
  });

  function submitForm() {
    props.handleSubmit(user);
    setUser({ username: '', name: '', email: '' });
=======
  const [user, setUser] = useState(
     {
        username: "",
        password: "",
        email: ""
     }
  );

  function submitForm() {
    props.handleSubmit(user);
    setUser({username: '', password: '', email: ''});
>>>>>>> origin
  }

  function handleChange(event) {
    const { name, value } = event.target;
<<<<<<< HEAD
    setUser({ ...user, [name]: value });
=======
    if (name === "password")
      setUser(
         {username: user['username'], password: value, email: user['email']}
      );
    else if (name === "username")    
       setUser(
         {username: value, password: user['password'], email: user['email']}   
       );
    else if (name === "email")
        setUser(
            {username: user['username'], password: user['password'], email: value}
        );
>>>>>>> origin
  }

  return (
<<<<<<< HEAD
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={user.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={handleChange}
      />
      <input type="button" value="Login" onClick={submitForm} />
    </form>
  );
=======
        <form>
        <label htmlFor="username">Username</label>
        <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
            type="text"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange} />
        <input type="button" value="Login" onClick={submitForm} />
        </form>
    );

>>>>>>> origin
}

export default UserForm;
