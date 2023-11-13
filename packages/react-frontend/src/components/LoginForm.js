import React, {useState} from 'react';

function LoginForm(props) {
    const [user, setUser] = useState(
       {
          email: "",
          password: "",
       }
    );

    const handleEmailChange = (event) => {
        setUser({ ...user, email: event.target.value });
    };

    const handlePasswordChange = (event) => {
        setUser({ ...user, password: event.target.value });
    };

    const handleLogin = () => {
        props.login(user);
    };

    return(
        <form>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleEmailChange}
                />
            <label htmlFor="email">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handlePasswordChange}
                 />
            <input type="button" value="Login" onClick={handleLogin} />
        </form>
    );
}

export default LoginForm;