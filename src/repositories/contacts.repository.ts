import { prisma } from '../database/prisma-client.js';
import type { Contact, ContactCreate, ContactCreateData, ContactRepository } from '../interfaces/contacts.interface.js';

export class ContactRepositoryPrisma implements ContactRepository {
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId,
            },
        });
        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                
                OR: [
                    { email },
                    { phone }
                ]
            },
        });
        return result || null;
    }

}