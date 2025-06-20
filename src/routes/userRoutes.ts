import { FastifyInstance } from 'fastify';
import prisma from '../db';

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };
    try {
      const user = await prisma.user.create({ data: { name, email } });
      return user;
    } catch {
      reply.code(500).send({ error: 'Erro ao criar usuário.' });
    }
  });

  app.get('/users', async () => {
    return await prisma.user.findMany();
  });

  app.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (user) return user;
    reply.code(404).send({ error: 'Usuário não encontrado.' });
  });

  app.put('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string; email: string };
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email },
      });
      return user;
    } catch {
      reply.code(404).send({ error: 'Usuário não encontrado.' });
    }
  });

  app.delete('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      await prisma.user.delete({ where: { id: parseInt(id) } });
      return { message: 'Usuário removido.' };
    } catch {
      reply.code(404).send({ error: 'Usuário não encontrado.' });
    }
  });
}
