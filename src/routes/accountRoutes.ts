// src/routes/accountRoutes.ts

import { FastifyInstance } from 'fastify';
import prisma from '../db';

export default async function accountRoutes(app: FastifyInstance) {
  app.post('/accounts', async (request, reply) => {
    const { userId, accountType, balance } = request.body as {
      userId: number;
      accountType: string;
      balance: string; // espera algo como "8.407,44"
    };

    try {
      const parsedBalance = parseFloat(balance.replace('.', '').replace(',', '.'));

      const account = await prisma.account.create({
        data: {
          userId,
          accountType,
          balance: parsedBalance,
        },
      });
      return account;
    } catch (err) {
      console.error(err);
      reply.code(500).send({ error: 'Erro ao criar conta.' });
    }
  });

  app.get('/accounts', async () => {
    return await prisma.account.findMany();
  });

  app.get('/accounts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const account = await prisma.account.findUnique({
      where: { id },
    });

    if (account) return account;
    reply.code(404).send({ error: 'Conta não encontrada.' });
  });

  app.put('/accounts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { accountType, balance } = request.body as {
      accountType: string;
      balance: string;
    };

    try {
      const parsedBalance = parseFloat(balance.replace('.', '').replace(',', '.'));

      const account = await prisma.account.update({
        where: { id },
        data: {
          accountType,
          balance: parsedBalance,
        },
      });

      return account;
    } catch (err) {
      reply.code(404).send({ error: 'Conta não encontrada.' });
    }
  });

  app.delete('/accounts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.account.delete({ where: { id } });
      return { message: 'Conta removida.' };
    } catch {
      reply.code(404).send({ error: 'Conta não encontrada.' });
    }
  });
}
