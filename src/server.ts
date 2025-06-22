import 'dotenv/config';

import Fastify from 'fastify';
import cors from '@fastify/cors'; // 👈 import do plugin de CORS
import userRoutes from './routes/userRoutes';

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = Fastify({ logger: true });

// 👇 Registra o CORS permitindo a origem do seu frontend Vercel
app.register(cors, {
  origin: true,
  credentials: true,
});

// Registra rotas depois do CORS
app.register(userRoutes);

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});
