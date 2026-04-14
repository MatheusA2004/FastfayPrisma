import type { FastifyInstance } from 'fastify';
import { ContactRelationUseCase } from '../usecases/contact-relation.usecases.js';
import { ContactRelationRepositoryPrisma } from '../repositories/contact-relation.repository.js';
import { ContactRepositoryPrisma } from '../repositories/contacts.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export async function contactRelationRoutes(fastify: FastifyInstance) {
    const relationRepository = new ContactRelationRepositoryPrisma();
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const useCase = new ContactRelationUseCase(relationRepository, contactRepository, userRepository);

    fastify.addHook('preHandler', authMiddleware);

    // POST /contacts/:contactId/relations
    fastify.post<{ Params: { contactId: string }; Body: { relatedContactId: string; type: string } }>(
        '/:contactId/relations',
        async (request, reply) => {
            const { contactId } = request.params;
            const { relatedContactId, type } = request.body;
            const userEmail = request.headers['email'] as string;
            try {
                const data = await useCase.create({ contactId, relatedContactId, type, userEmail });
                return reply.status(201).send(data);
            } catch (error) {
                reply.send(error);
            }
        }
    );

    // GET /contacts/:contactId/relations
    fastify.get<{ Params: { contactId: string } }>(
        '/:contactId/relations',
        async (request, reply) => {
            const { contactId } = request.params;
            const userEmail = request.headers['email'] as string;
            try {
                const data = await useCase.listRelations(contactId, userEmail);
                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
        }
    );

    // DELETE /contacts/:contactId/relations/:relationId
    fastify.delete<{ Params: { contactId: string; relationId: string } }>(
        '/:contactId/relations/:relationId',
        async (request, reply) => {
            const { relationId } = request.params;
            const userEmail = request.headers['email'] as string;
            try {
                const result = await useCase.delete(relationId, userEmail);
                return reply.send({ success: result });
            } catch (error) {
                reply.send(error);
            }
        }
    );
}
