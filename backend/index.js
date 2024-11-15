const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { createUser, getUser } = require('./queries/sql_users.js');
const { createContactForUser, getContactsForUser, DeleteOneContact, updateContact } = require('./queries/sql_contacts.js');

const app = express()
const port = 8080

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));
  

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
        const users = await getUser(req.query.username, req.query.password);
        res.status(200).json({ message: 'Users retrieved successfully', users: users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
})

app.post('/contacts', async(req, res) => {
    try {
        const { username, contactData } = req.body;
        const newContact = await createContactForUser(username, contactData);
        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
})

app.get('/contacts', async(req, res) => {
    try {
        const username  = req.query.username;
        const contacts = await getContactsForUser(username);
        res.status(200).json({ message: 'Contact fetched successfully', contacts: contacts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error: error.message });
    }
})

app.delete('/contacts/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deletedContact = await DeleteOneContact(id);
        res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
})

app.put('/contacts/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;
        const updated = await updateContact(id, updatedContact);
        res.status(200).json({ message: 'Contact updated successfully', contact: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})