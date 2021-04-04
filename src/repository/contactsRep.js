const Contact = require('../schema/contactsSchema');
class ContactsRepository {
    constructor() {
        this.model = Contact;
    }

    async getAllContactsRep(userId, { limit = 5, page = 1, sortBy, sortByDesc, filter, favorite }) {
        const params = {
            limit,
            page,
            favorite,
            sort: {
                ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
                ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
            },
            select: filter ? filter.split('|').join(' ') : '',
            populate: {
                path: 'owner',
                select: 'name email subscription -_id',
            },
        };
        const query = favorite ? { owner: userId, favorite } : { owner: userId };
        const result = await Contact.paginate(query, params);
        return result;
    }

    async getContactById(userId, id) {
        const result = await this.model.findOne({ _id: id, owner: userId }).populate({
            path: 'owner',
            select: 'subscription name email -_id',
        });
        return result;
    }

    async createContact(userId, body) {
        const result = await this.model.create({ ...body, owner: userId });
        return result;
    }

    async updateContact(userId, id, body) {
        const result = await this.model.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true });
        return result;
    }

    async removeContact(userId, id) {
        const result = await this.model.findByIdAndRemove({
            _id: id,
            owner: userId,
        });
        return result;
    }
}

module.exports = ContactsRepository;

// async getAllContactsRep(userId, { limit = 5, page = 1, sortBy, sortByDesc, filter, favorite }) {
//     if (!favorite) {
//         const result = await this.model.paginate(
//             { owner: userId },
//             {
//                 limit,
//                 page,
//                 favorite,
//                 sort: {
//                     ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
//                     ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
//                 },
//                 select: filter ? filter.split('|').join(' ') : '',
//                 populate: {
//                     path: 'owner',
//                     select: 'name email subscription -_id',
//                 },
//             },
//         );
//         return result;
//     } else {
//         const result = await this.model.paginate(
//             { favorite, owner: userId },
//             {
//                 limit,
//                 page,
//                 favorite,
//                 sort: {
//                     ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
//                     ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
//                 },
//                 select: filter ? filter.split('|').join(' ') : '',
//                 populate: {
//                     path: 'owner',
//                     select: 'name email subscription -_id',
//                 },
//             },
//         );
//         return result;
//     }
// }
