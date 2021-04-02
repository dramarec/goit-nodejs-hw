const { ContactsRepository } = require('../repository');

class ContactsService {
    constructor() {
        this.repsitories = {
            contacts: new ContactsRepository(),
        };
    }

    async getAllContactsSrv(userId, query) {
        const data = await this.repsitories.contacts.getAllContactsRep(userId, query);
        const { page, totalPages, limit, totalDocs: totalContacts, docs: contacts } = data;
        return {
            page: Number(page),
            totalPages,
            limit: Number(limit),
            totalContacts,
            contacts,
        };
    }

    async getContactById(userId, { contactId }) {
        const data = await this.repsitories.contacts.getContactById(userId, contactId);
        return data;
    }

    async createContact(userId, body) {
        const data = await this.repsitories.contacts.createContact(userId, body);
        return data;
    }

    async updateContact(userId, { contactId }, body) {
        const data = await this.repsitories.contacts.updateContact(userId, contactId, body);
        return data;
    }

    async removeContact(userId, { contactId }) {
        const data = await this.repsitories.contacts.removeContact(userId, contactId);
        return data;
    }
}

module.exports = ContactsService;
