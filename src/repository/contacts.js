const { v4: uuid } = require('uuid');
const db = require('../db');

class ContactsRepository {
    constructor() {}

    getAllContacts() {
        return db.get('contacts').value();
    }
    getContactById(id) {
        return db.get('contacts').find({ id }).value();
    }
    createContact(body) {
        const id = uuid();
        const record = {
            id,
            ...body,
            ...(body.done ? {} : { done: false }),
        };
        db.get('contacts').push(record).write();
        return record;
    }
    updateContact(id, body) {
        const record = db.get('contacts').find({ id }).assign(body).write();
        db.write();
        return record.id ? record : null;
    }

    removeContact(id) {
        const [record] = db.get('contacts').remove({ id }).write();
        return record;
    }
}

module.exports = ContactsRepository;
