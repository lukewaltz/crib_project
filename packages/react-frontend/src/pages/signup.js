import React, {useState} from "react";
import UserForm from "../components/UserForm";
import "./signup.css";
import Logo from "../logo-group.png"
import Arrow from "./arrow.svg"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    
    
//   const connection_URL = "https://crib-app.azurewebsites.net";
    const connection_URL = "http://localhost:8000"
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: ""
    });

    function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit(e){
        e.preventDefault();
        setFormData({username: '', email: '', name: '', password:''});
        fetch(`${connection_URL}/signup`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        })
        .then((response) => {
            if (response.status === 201) {
                console.log('User signed up successfully');
                navigate('/group');
                return response.json();
            } else if (response.status === 500) {
                console.log('Could not signup');
                throw new Error('Could not signup');
            } else {
                throw new Error('Sign up not successful');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    

    return (
        <div className="sign-up">
            <form >
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <div className="group">
                            <img className="logo-group" alt="Logo group" src={Logo}/>
                        </div>
                    </div>
                    <div className="text-wrapper">SIGN UP</div>
                </div>

                <div className="name-region">
                    <div className="text-wrapper-4">ENTER NAME</div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="name-field"
                        />
                </div>

                <div className="username-region">
                    <div className="text-wrapper-5">ENTER USERNAME</div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="username-field"
                        />
                </div>

                <div className="email-region">
                    <div className="text-wrapper-3">ENTER EMAIL</div>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="email-field"
                    />
                </div>

                <div className="password-region">
                    <div className="rectangle" />
                    <div className="text-wrapper-2">CREATE PASSWORD</div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="password-field"
                        />
                    <p className="p">already have an account? log in here!</p>
                    <button type="submit" className="ellipse" onClick={handleSubmit}>
                        <img className="vector" alt="Vector" src={Arrow} />
                    </button>
                </div>
            </form>
        </div>
  );
};
 
export default Signup;

