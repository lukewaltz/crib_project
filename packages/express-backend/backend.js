// backend.js
import express from "express";
import cors from "cors";
import userServices from './user-services.js';
import User from "./user.js";
import { createRequire } from 'module';
import taskServices from "./task-services.js";

const require = createRequire(import.meta.url);

const app = express();
const port = 8000;
const session = require('express-session');

app.use(cors());
app.use(express.json());
app.use(session({secret:"secret", resave:false, saveUninitialized:true}));

// users
app.post('/login', async (req, res) => {
    try {
        const user = await userServices.findUserByUsername(req.body.username);

        if(!user){
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

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).send();
});

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

app.get('/', (req, res) => {
    if(!req.session.user){
        return res.status(401).send('not logged in');
    }

    return res.status(200).send('logged in');
});

app.put('/users/:username/addTask', (req, res) => {
    const username = req.params.username;
    const newTask = req.body.tasks;
    userServices.addTasks(username, newTask)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(404).json({ error:'User not found' });
        })

});

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
app.get('/tasks', (req, res) => {
    taskServices.getTasks()
        .then((tasks) => {
            res.status(200).json({ task_list:tasks });
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
});

app.post('/tasks', (req, res) => {
    const newTask = req.body
    if (newTask === undefined){
        res.status(404).send("newTask not found");
    } else {
    taskServices.addTask(newTask)
        .then(res.status(201)
        .send(newTask)
        .catch((error) => console.error("error caught in app.post(task)", error)));
    //     .then((error) =>{
    //         if(error == 500){
    //             return res.status(500).send('Could not add task');
    //         }else{
    //             return res.status(201).send('Added task');
    //         }
    // });
    }
});

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

// all
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
