const { ContactsRepository } = require('../repository');

class ContactsService {
    constructor() {
        this.repsitories = {
            contacts: new ContactsRepository(),
        };
    }

    // async getAllContacts(query) {
    //     const data = await this.repsitories.contacts.getAllContacts(query);
    //     const {
    //         docs: contacts,
    //         totalDocs: total,
    //         limit,
    //         page,
    //         totalPages,
    //     } = data;
    //     return { contacts, total, totalPages, limit, page };
    // }
    async getAllContactsSrv(query) {
        console.log('getAllContactsSrv query :', query);
        const data = await this.repsitories.contacts.getAllContactsRep(query);
        console.log('getAllContactsSrv data :', data);
        return data;
    }

    async getContactById({ contactId }) {
        const data = await this.repsitories.contacts.getContactById(contactId);
        return data;
    }

    async createContact(body, userId) {
        const data = await this.repsitories.contacts.createContact(
            body,
            userId,
        );
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
