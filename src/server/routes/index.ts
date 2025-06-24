import express, { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// CONTROLERS
import { CidadesController } from './../controllers';

const router: Router = express.Router();

// Extends de Error para inserir o StatusCode
// que pode ser opcional
interface ErrType extends Error {
  status?: number;
}

router.get('/', (req: Request, res: Response) => {
  res.send('EndPoint para teste: Back Rodando!');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);


// Mensagem de erro para págia ou recurso não encontado
// será utilizado para os end-points que não existam 
router.use((req: Request, res: Response, next: NextFunction) => {
  const error: ErrType = new Error('Not Found');
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});

// Router USE para retornar mensagens de erro para o Usuário
router.use((err: ErrType, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).
    json({ errors: err.message || 'Internal Server Error' });
});

export { router };