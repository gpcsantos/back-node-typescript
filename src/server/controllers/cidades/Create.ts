import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

interface IBodyProps extends Omit<ICidade, 'id'> { }

interface ErrType {
  message: object;
  status?: number;
}

export const createValidation = validation((getSchema) =>
({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
})
);

export const create = async (req: Request<{}, {}, ICidade>, res: Response, next: NextFunction) => {

  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error) {
    const err: ErrType = {
      message: { default: result.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    next(err);
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
  return;
};