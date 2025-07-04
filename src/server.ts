import 'dotenv/config';

import Fastify from 'fastify';
import cors from '@fastify/cors'; // 👈 import do plugin de CORS
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';

const PORT = parseInt(process.env.PORT || '3001', 10);
const app = Fastify({ logger: true });

// 👇 Registra o CORS permitindo a origem do seu frontend Vercel
app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Registra rotas depois do CORS
app.register(userRoutes);
app.register(accountRoutes);
app.register(transactionRoutes);


app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});
