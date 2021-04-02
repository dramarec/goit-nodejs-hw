const Contact = require('../schema/contactsSchema');
class ContactsRepository {
    constructor() {
        this.model = Contact;
    }

    async getAllContactsRep({
        limit = 2,
        offset = 0,
        page = 1,
        sortBy,
        sortByDesc,
    }) {
        // console.log('limit, offset, page', limit, offset, page);
        const { docs: contacts, totalDocs: total } = await this.model.paginate(
            {},
            {
                limit,
                offset,
                page,
                sort: {
                    ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
                    ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
                },
            },
        );
        return {
            page,
            limit: Number(limit),
            offset: Number(offset),
            total,
            contacts,
        };
    }

    async getContactById(id) {
        const result = await this.model.findOne({ _id: id });
        return result;
    }

    async createContact(body, userId) {
        const result = await this.model.create({ ...body, owner: userId });
        return result;
    }
    async updateContact(id, body) {
        const result = await this.model.findByIdAndUpdate(
            { _id: id },
            { ...body },
            { new: true },
        );
        return result;
    }

    async removeContact(id) {
        const result = await this.model.findByIdAndRemove({
            _id: id,
        });
        return result;
    }
}

module.exports = ContactsRepository;
