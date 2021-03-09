const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    await fs
        .readFile(contactsPath)
        .then(contacts => console.table(JSON.parse(contacts)))
        .catch(err => console.error(err.message));
}

async function getContactById(contactId) {
    await fs
        .readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.find(contact => contact.id === contactId))
        .then(contact => console.table(contact))
        .catch(err => console.error(err.message));
}

async function removeContact(contactId) {
    await fs
        .readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts => contacts.filter(contact => contact.id !== contactId))
        .then(newContacts =>
            fs.writeFile(contactsPath, JSON.stringify(newContacts)),
        )
        .then(() => listContacts())
        .catch(err => console.error(err.message));
}

async function addContact(name, email, phone) {
    await fs
        .readFile(contactsPath)
        .then(contacts => JSON.parse(contacts))
        .then(contacts =>
            fs.writeFile(
                contactsPath,
                JSON.stringify([
                    ...contacts,
                    { id: uuidv4(), name: name, email: email, phone: phone },
                ]),
            ),
        )
        .then(() => listContacts())
        .catch(err => console.error(err.message));
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
