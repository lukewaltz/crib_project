import React, {useState} from 'react';
function UserForm(props) {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
  });

  function submitForm() {
    props.handleSubmit(user);
    setUser({ username: '', name: '', email: '' });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  return (
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
}

export default UserForm;
