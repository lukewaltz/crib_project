// backend.js
import express from "express";
import cors from "cors";
import userServices from './user-services.js';
import User from "./user.js";

const app = express();
const port = 8000;
const router = express.Router();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    let result = userServices.findUserByUserName(req.body.username);
    console.log(result);
    if(result === undefined){
        return res.status(404).send('user not found');
    }else{
        return res.status(200).send('login successful');
    }
});

app.post('/signup', async (req, res) => {
    userServices.addUser(req.body).then((e) =>{
        // chang error code to reason unable to signup
        if(e == 500){
            return res.status(500).send('Unable to sign up');
        }else{
            return res.status(201).send('Successful signup');
        }
    });
    
});

app.get('/', (req, res) => {
    res.send('Welcome to Crib');
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
                res.status(200).json({ user_list:users })
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
});

app.delete('/users/username', (req, res) => {
    const username = req.query.username;
    userServices.deleteUser(username)
        .then(() => {
            res.status(203);
        })
        .catch(() => {
            res.status(404).json({ error:'User not found' })
        })
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

/*
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (id != undefined) {
        
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result !== undefined){
        const index = users['users_list'].indexOf(result);
        users['users_list'].splice(index,1);
        res.status(204).send(result);
    }else{
        res.status(404).send('Resource not found');
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    user.id = "" + Math.floor((1+Math.random())*100000);
    users['users_list'].push(user);
    return user;
}

app.post('/login', (req, res) => {

});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let newUser = addUser(userToAdd);
    res.status(201).send(newUser);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 
*/