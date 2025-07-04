import { Knex } from './server/database/knex';
import { server } from './server/server';


const startServer = () => {
  server.listen(process.env.PORT || 3002, () => {
    console.log(`BACK rodando na porta: ${process.env.PORT || 3002}!!`);
  });
}

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  startServer();
}