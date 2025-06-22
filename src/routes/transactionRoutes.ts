import { FastifyInstance } from 'fastify';
import prisma from '../db';

export default async function transactionRoutes(app: FastifyInstance) {
  app.post('/transactions', async (request, reply) => {
    const { userId, transactionType, valueTransaction } = request.body as {
      userId: number;
      transactionType: string;
      valueTransaction: string; // Ex: "R$ 4.444,44"
    };

    try {
      const parsedValue = parseFloat(
        valueTransaction.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.')
      );

      const transaction = await prisma.transaction.create({
        data: {
          userId,
          transactionType,
          valueTransaction: parsedValue,
          date: new Date(),
        },
      });

      return transaction;
    } catch (err) {
      console.error(err);
      reply.code(500).send({ error: 'Erro ao criar transação.' });
    }
  });

  app.get('/transactions', async () => {
    return await prisma.transaction.findMany();
  });

  app.get('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (transaction) return transaction;
    reply.code(404).send({ error: 'Transação não encontrada.' });
  });

  app.get('/transactions/user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };

    const transactions = await prisma.transaction.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { date: 'desc' },
    });

    return transactions;
  });

  app.put('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { transactionType, valueTransaction } = request.body as {
      transactionType: string;
      valueTransaction: string;
    };

    try {
      const parsedValue = parseFloat(
        valueTransaction.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.')
      );

      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          transactionType,
          valueTransaction: parsedValue,
        },
      });

      return transaction;
    } catch (err) {
      reply.code(404).send({ error: 'Transação não encontrada.' });
    }
  });

  app.delete('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.transaction.delete({ where: { id } });
      return { message: 'Transação removida.' };
    } catch {
      reply.code(404).send({ error: 'Transação não encontrada.' });
    }
  });
}
