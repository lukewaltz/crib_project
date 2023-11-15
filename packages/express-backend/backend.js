// backend.js
import express from "express";
import cors from "cors";
import userServices from './user-services.js';
import User from "./user.js";
import { createRequire } from 'module';
import taskServices from "./task-services.js";
import backlogServices from "./backlog-services.js";
import pollServices from "./poll-services.js";

const require = createRequire(import.meta.url);

const app = express();
const port = 8000;
const session = require('express-session');

app.use(cors());
app.use(express.json());
app.use(session({secret:"secret", resave:false, saveUninitialized:true}));


//Users Endpoints


// Login and create new user
app.post('/login', async (req, res) => {
    try {
        const user = await userServices.findUserByUsername(req.body.username);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch){
                req.session.user = user;
                return res.status(200).send('Login successful');
            } else{
                return res.status(401).send('cannot login');
            }
        });
        
       
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

// logout of current user session
app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).send();
});

// create new user
app.post('/signup', async (req, res) => {
    userServices.addUser(req.body).then((error) =>{
        // change error code to reason unable to signup
        if(error == 500){
            return res.status(500).send('Unable to sign up');
        }else{
            return res.status(201).send('Successful signup');
        }
    });
});

// homescreen
app.get('/', (req, res) => {
    // if(!req.session.user){
    //     return res.status(401).send('not logged in');
    // }

    return res.status(200).send('logged in');
});

// give user a task that is already in task list given it has not been assigned already
app.put('/users/:username/assign/:id', (req, res) => {
    const username = req.params.username;
    const id = req.params.id;

    taskServices.findTask(id)
    .then((task) => {
        if (task && task.assignee === false) {
            return userServices.addTask(username, task)
                .then((user) => {
                    // Update the task's "assigned" field to true
                    task.assignee = true;
                    return task.save()
                        .then(() => user); // Return the updated user
                });
        } else if (task && task.assignee === true) {
            throw new Error("Task is already assigned");
        } else {
            throw new Error("Task not found");
        }
    })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(404).json({ error: error.message });
        });
});

//complete a task -> remove it from list
app.put('/users/:username/complete/:id', async (req, res) => {
    const username = req.params.username;
    const taskId = req.params.id;

    userServices.findUserByUsername(username)
        .then((user) => {
            if (user.tasks.indexOf(taskId) < 0) {
                res.json({ message:'User does not have that task'});
                return;
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    try {

        // remove task from user's list
        await userServices.removeTask(username, taskId);

        // add task to backlog
        taskServices.findTask(taskId)
            .then((task) => {
                return backlogServices.addTask(username, task);
            })

        // delete task from task list
        await taskServices.deleteTask(taskId);

        // If both operations are successful, send a success response
        res.json({ message: 'Task completed successfully' });
    } catch (error) {
        // Handle errors appropriately
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// get users, either by url field or just entire user list
app.get('/users', (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    if (username && email) {
        userServices.findUserByUsernameAndEmail(username, email)
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(() => {
                res.status(404).json({ error:'User not found' });
            })
    } else if (username) {
        userServices.findUserByUsername(username)
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(() => {
                res.status(404).json({ error:'User not found' });
            })
    } else if (email) {
        userServices.findUserByEmail(email)
            .then((user) => {
                res.status(200).json(user);
            })
            .catch(() => {
                res.status(404).json({ error:'User not found' });
            })
    } else {
        userServices.getUsers()
            .then((users) => {
                res.status(200).json({ user_list:users });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
});

// remove a user from the user list
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await userServices.deleteUser(id)
        .then(() => {
            res.json('User deleted successfully')
        })
        .catch(() => {
            res.status(404).json('Server error');
        })
});


// tasks


/* when does response get sent? */
// get tasks field
app.get('/tasks', (req, res) => {
    taskServices.getTasks()
        .then((tasks) => {
            res.status(200).json({ task_list:tasks });
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
});

// add new task to task list, will be marked with assigned=false
app.post('/tasks', (req, res) => {
    const newTask = req.body
    if (newTask === undefined){
        res.status(404).send("newTask not found");
    } else {
    taskServices.addTask(newTask)
        .then((error) =>{
            if(error == 500){
                return res.status(500).send('Could not add task');
            } else {
                return res.status(201).send('Added task');
            }
        });
    }
});

// remove a task from the task list
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await taskServices.deleteTask(id)
        .then(() => {
            res.json('Task deleted successfully')
        })
        .catch(() => {
            res.status(404).json('Could not delete task');
        })
});

//get poll
app.get('/polls', (req, res) => {
    pollServices.getPolls()
        .then((polls) => {
            res.status(200).json( { poll_list:polls });
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
});

app.delete('/polls/:id', async (req, res) => {
    const id = req.params.id;
    await pollServices.deletePoll(id)
    .then(() => {
        res.json('Poll deleted successfully')
    })
    .catch(() => {
        res.status(404).json('could not delete poll');
    })
});

// post poll
app.post("/polls", function (req, res) {  
    const newPoll = req.body;
    pollServices.addPoll(newPoll)
        .then(() => {
            res.status(201).json({ message: "poll added successfully" });
        })
        .catch((err) => {
            res.status(500).json({ err: "could not add poll"});
        });
});

app.post('/polls/:pollId', async (req, res) => {
    const { pollId } = req.params;
    const { option } = req.body;
  
    try {
      const poll = await pollServices.findPoll(pollId);
  
      if (!poll) {
        return res.status(404).json({ message: 'Poll not found' });
      }
  
      // Check if the option is valid
      if (option !== 'option1' && option !== 'option2') {
        return res.status(400).json({ message: 'Invalid option' });
      }
  
      // Increment the vote count for the selected option
      poll[`${option}Votes`] += 1;
  
      // Save the updated poll document
      await poll.save();
  
      res.status(200).json({ message: `Vote for ${option} recorded successfully` });
    } catch (error) {
      console.error('Error recording vote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.post('/tasks', (req, res) => {
    const newTask = req.body;
    taskServices.addTask(newTask)
        .then(() => {
            res.status(201).json({ message: 'Task added successfully' });
        })
        .catch((error) => {
            // Handle specific error or use a general error message
            res.status(500).json({ error: 'Could not add task' });
        });
});


//backlog services


app.get('/backlog', (req, res) => {
    backlogServices.getTasks()
        .then((tasks) => {
            res.status(200).json({ backlog:tasks });
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
});

app.delete('/backlog/:id', async (req, res) => {
    const id = req.params.id;
    await backlogServices.deleteTask(id)
        .then(() => {
            res.json('Task deleted successfully')
        })
        .catch(() => {
            res.status(404).json('Could not delete task');
        })
});

// all
app.listen(process.env.PORT || port, () => {
    console.log(`rest api is listening`);
})
