const { ContactsRepository } = require('../repository');
class ContactsService {
    constructor() {
        this.repsitories = {
            contacts: new ContactsRepository(),
        };
    }

    getAllContacts() {
        const data = this.repsitories.contacts.getAllContacts();
        return data;
    }
    getContactById({ contactId }) {
        const data = this.repsitories.contacts.getContactById(contactId);
        return data;
    }
    createContact(body) {
        console.log('body :', body);
        const data = this.repsitories.contacts.createContact(body);
        return data;
    }
    updateContact({ contactId }, body) {
        const data = this.repsitories.contacts.updateContact(contactId, body);
        return data;
    }

    removeContact({ contactId }) {
        console.log('id :', id);

        const data = this.repsitories.contacts.removeContact(contactId);
        return data;
    }
}

module.exports = ContactsService;
