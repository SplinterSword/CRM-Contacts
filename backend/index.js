const express = require('express');
const { Sequelize } = require('sequelize');
const { createUser, getUser } = require('./queries/sql_users.js');

const app = express()
const port = 8080

app.use(express.json());

const sequelize = new Sequelize('postgres://postgres:cC509958@localhost:5432/crm_contact');

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        sequelize.close()
        process.exit(0);
    }
}

main();

app.post('/users', async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await createUser(username, email, password);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
})

app.get('/users', async(req, res) => {
    try {
        const users = await getUser(req.body.username, req.body.password);
        res.status(200).json({ message: 'Users retrieved successfully', users: users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})