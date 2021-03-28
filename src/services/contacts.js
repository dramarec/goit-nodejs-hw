const { ContactsRepository } = require('../repository');
const db = require('../db');
class ContactsService {
    constructor() {
        process.nextTick(async () => {
            const client = await db;
            this.repsitories = {
                contacts: new ContactsRepository(client),
            };
        });
    }

    async getAllContacts() {
        const data = await this.repsitories.contacts.getAllContacts();
        return data;
    }

    async getContactById({ contactId }) {
        const data = await this.repsitories.contacts.getContactById(contactId);
        return data;
    }

    async createContact(body) {
        const data = await this.repsitories.contacts.createContact(body);
        return data;
    }

    async updateContact({ contactId }, body) {
        const data = await this.repsitories.contacts.updateContact(
            contactId,
            body,
        );
        return data;
    }

    async removeContact({ contactId }) {
        const data = await this.repsitories.contacts.removeContact(contactId);
        return data;
    }
}

module.exports = ContactsService;
