import cors from '@fastify/cors';
import fastify from 'fastify';
import { loginRouter } from './routes/loginRouter.js';


const app = fastify();

app.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:3333'],
});

app.register(loginRouter);

app.setErrorHandler((error, req, res) => {
  res.status(500).send({ error: 'Something went wrong' });
});

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('📚 HTTP server running on HTTP://localhost:3333');
});
