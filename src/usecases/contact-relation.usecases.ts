import type { ContactRelation, ContactRelationCreate, ContactRelationRepository } from '../interfaces/contact-relation.interface.js';
import type { ContactRepository } from '../interfaces/contacts.interface.js';
import type { userRepository } from '../interfaces/user.interface.js';

export class ContactRelationUseCase {
    private relationRepository: ContactRelationRepository;
    private contactRepository: ContactRepository;
    private userRepository: userRepository;

    constructor(
        relationRepository: ContactRelationRepository,
        contactRepository: ContactRepository,
        userRepository: userRepository,
    ) {
        this.relationRepository = relationRepository;
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    async create({ contactId, relatedContactId, type, userEmail }: ContactRelationCreate): Promise<ContactRelation> {
        const user = await this.userRepository.findbyEmail(userEmail);
        if (!user) throw new Error('User not found');

        const allContacts = await this.contactRepository.findAllContacts(user.id);
        const contactIds = allContacts.map(c => c.id);

        if (!contactIds.includes(contactId)) {
            throw new Error('Contact does not belong to the authenticated user');
        }

        if (!contactIds.includes(relatedContactId)) {
            throw new Error('Related contact does not belong to the authenticated user');
        }

        if (contactId === relatedContactId) {
            throw new Error('A contact cannot be related to itself');
        }

        const result = await this.relationRepository.create({ contactId, relatedContactId, type });
        return result;
    }

    async listRelations(contactId: string, userEmail: string): Promise<ContactRelation[]> {
        const user = await this.userRepository.findbyEmail(userEmail);
        if (!user) throw new Error('User not found');

        const allContacts = await this.contactRepository.findAllContacts(user.id);
        const belongs = allContacts.some(c => c.id === contactId);

        if (!belongs) throw new Error('Contact does not belong to the authenticated user');

        return this.relationRepository.findAll(contactId);
    }

    async delete(id: string, userEmail: string): Promise<boolean> {
        const user = await this.userRepository.findbyEmail(userEmail);
        if (!user) throw new Error('User not found');

        const relation = await this.relationRepository.findById(id);
        if (!relation) throw new Error('Relation not found');

        const allContacts = await this.contactRepository.findAllContacts(user.id);
        const belongs = allContacts.some(c => c.id === relation.contactId);
        if (!belongs) throw new Error('Relation does not belong to the authenticated user');

        return this.relationRepository.delete(id);
    }
}
