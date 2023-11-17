import React from 'react';
import "./post.css";
import Form from '../components/Form'; 
import PollForm from '../components/PollForm';
<<<<<<< HEAD
import SettingsVector from "./vector.svg"

=======
>>>>>>> origin

export const Post = (props) => {

    const connection_URL = "https://crib-app.azurewebsites.net";
    // const connection_URL = "http://localhost:8000"

    function handleTaskSubmit(task) {
        console.log(task.task)
        
        fetch(`${connection_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Task submitted:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function handlePollSubmit(poll){
        console.log(poll.poll)
        
        fetch(`${connection_URL}/polls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(poll),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Poll posted:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="post-something">
            <div className="div">
<<<<<<< HEAD
                <div className="overlap">
                    <div className="group">
                        <div className="div-wrapper">
                            <Form handleSubmit = {handleSubmit} />
=======
                <div className="task-box">
                    <div className="group">
                        <div className="div-wrapper">
                            <Form handleSubmit = {handleTaskSubmit} />
>>>>>>> origin
                        </div>
                    </div>
                    <div className="task-text">TASK</div>
                    <div className="due-date-text">DUE DATE</div>
<<<<<<< HEAD
                    <div className="weight-text">WEIGHT:</div>
                    <div className = "assignee-text"> ASSIGNEE:</div>
                </div>
                <div className="overlap-2">
                    <div className="text-wrapper-5">TITLE</div>
                    <div className="text-wrapper-6">OPTION 1</div>
                    <div className="text-wrapper-7">OPTION 2</div>
                    <div className="rectangle-4" />
                    <div className="rectangle-5" />
                    <div className="rectangle-6" />
                    <div className="overlap-wrapper">
                    <div className="2nd-post">POST</div>
=======
                    <div className="weight-text">WEIGHT</div>
                    <div className = "assignee-text"> ASSIGNEE</div>
                </div>
                <div className="poll-box ">
                <div className="group">
                        <div className="div-wrapper">
                            <PollForm handleSubmit = {handlePollSubmit} />
                        </div>
>>>>>>> origin
                    </div>
                    <div className="title2-text">TITLE</div>
                    <div className="option1-text ">OPTION 1</div>
                    <div className="option2-text ">OPTION 2</div>
                </div>
                <div className="overlap-4">
                    <div className="text-wrapper-9">TASK</div>
                    <div className="rectangle-7" />
                    <div className="logo-group-wrapper">
                        <img className="logo-group" alt="Logo group" src="logo-group.png" />
                    </div>
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group-2">
                            <div className="POST-SOMETHING">
                                POST <br />
                                SOMETHING
                            </div>
                            <div className="explanationpoint">!</div>
                        </div>
                    </div>
                </div>
                <div className="poll-text">POLL</div>
            </div>
        </div>
    );
};

 
export default Post;
