import 'dotenv/config';
import Fastify from 'fastify';
import userRoutes from './routes/userRoutes';

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = Fastify({ logger: true });

app.register(userRoutes);

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});
