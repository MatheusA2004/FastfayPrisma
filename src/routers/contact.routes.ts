import type { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usercases.js';
import { ContactRepositoryPrisma } from '../repositories/contacts.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { ContactCreate } from '../interfaces/contacts.interface.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


export async function contactRoutes(fastify: FastifyInstance) {
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const contactUseCase = new ContactUseCase(contactRepository, userRepository);

    fastify.addHook('preHandler', authMiddleware);


    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail
            });

            return reply.status(201).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', async (request, reply) => {
        return reply.send({ message: 'Contact route is active' });
    });
}
