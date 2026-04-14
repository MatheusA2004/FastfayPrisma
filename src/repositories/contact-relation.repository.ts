import { prisma } from '../database/prisma-client.js';
import type { ContactRelation, ContactRelationRepository } from '../interfaces/contact-relation.interface.js';

export class ContactRelationRepositoryPrisma implements ContactRelationRepository {

    async create(data: { contactId: string; relatedContactId: string; type: string }): Promise<ContactRelation> {
        const result = await prisma.contactRelation.create({
            data: {
                contactId: data.contactId,
                relatedContactId: data.relatedContactId,
                type: data.type,
            },
        });
        return result;
    }

    async findAll(contactId: string): Promise<ContactRelation[]> {
        const result = await prisma.contactRelation.findMany({
            where: { contactId },
            include: {
                contact: false,
            },
        });
        return result;
    }

    async findById(id: string): Promise<ContactRelation | null> {
        const result = await prisma.contactRelation.findUnique({
            where: { id },
        });
        return result ?? null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await prisma.contactRelation.delete({
            where: { id },
        });
        return !!result;
    }
}
