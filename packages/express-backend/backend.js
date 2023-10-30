// backend.js
import express from "express";
import cors from "cors";
import userServices from './user-services.js';
import User from "./user.js";
import taskServices from "./task-services.js";

const app = express();
const port = 8000;
const router = express.Router();

app.use(cors());
app.use(express.json());

// users

app.post('/login', (req, res) => {
    let result = userServices.findUserByUsername(req.body.username);
    console.log(result);
    if (result === undefined) {
        return res.status(404).send('user not found');
    } else {
        return res.status(200).send('login successful');
    }
});

app.post('/signup', async (req, res) => {
    userServices.addUser(req.body).then((error) =>{
        // chang error code to reason unable to signup
        if(error == 500){
            return res.status(500).send('Unable to sign up');
        }else{
            return res.status(201).send('Successful signup');
        }
    });
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

app.get('/tasks', (req, res) => {
    taskServices.getTasks()
        .then((tasks) => {
            res.status(200).json({ task_list:tasks });
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
});

app.put('/tasks', (req, res) => {
    const newTask = req.body
    taskServices.addTask(newTask).then((error) =>{
        // chang error code to reason unable to signup
        if(error == 500){
            return res.status(500).send('Could not add task');
        }else{
            return res.status(201).send('Added task');
        }
    });
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
