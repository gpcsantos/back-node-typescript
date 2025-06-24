import { server } from './server/server';

server.listen(process.env.PORT || 3002, () => {
  console.log(`BACK rodando na porta: ${process.env.PORT || 3002}!!`);
});
