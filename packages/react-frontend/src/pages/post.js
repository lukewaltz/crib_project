import React, { useState } from 'react';
import "./style.css";
import { Form } from '../components/Form';

export const Post = (props) => {
    return (
        <div className="post-something">
            <div className="div">
                <div className="overlap">
                    
                    <div className="rectangle" />
                    <div className="rectangle-2" />
                    <div className="overlap-group">
                        <div className="text-wrapper">ASSIGNED TO:</div>
                    </div>
                    <div className="group">
                        <div className="div-wrapper">
                            <Form handleSubmit = {props.handleSubmit} />

                        </div>
                    </div>
                    <div className="text-wrapper-3">TASK</div>
                    <div className="text-wrapper-4">DUE DATE</div>
                </div>
                <div className="overlap-2">
                    <div className="text-wrapper-5">TITLE</div>
                    <div className="text-wrapper-6">OPTION 1</div>
                    <div className="text-wrapper-7">OPTION 2</div>
                    <div className="rectangle-4" />
                    <div className="rectangle-5" />
                    <div className="rectangle-6" />
                    <div className="overlap-wrapper">
                        <div className="div-wrapper">
                            <div className="text-wrapper-2">POST</div>
                        </div>
                    </div>
                    <div className="overlap-3">
                        <div className="ellipse" />
                        <div className="text-wrapper-8">+</div>
                    </div>
                </div>
                <div className="overlap-4">
                    <div className="text-wrapper-9">TASK</div>
                    <div className="rectangle-7" />
                    <div className="logo-group-wrapper">
                        <img className="logo-group" alt="Logo group" src="logo-group.png" />
                    </div>
                    <div className="ellipse-2" />
                    <img className="vector" alt="Vector" src="vector.svg" />
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group-2">
                            <div className="POST-SOMETHING">
                                POST <br />
                                SOMETHING
                            </div>
                            <div className="text-wrapper-10">!</div>
                        </div>
                    </div>
                </div>
                <div className="text-wrapper-11">POLL</div>
            </div>
        </div>
    );
};

 
export default Post;

