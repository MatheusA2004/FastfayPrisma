import 'dotenv/config';
import fastify from "fastify";
import type {FastifyInstance} from "fastify";
import { userRoutes } from "./routers/user.routes.js";

const app: FastifyInstance = fastify({ logger: true });

app.register(userRoutes, { prefix: '/users' });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
  } else {
    app.log.info(`Server listening at ${address}`);
    console.log(`Outra forma de envio de mensagem no log...`);
  }
});
