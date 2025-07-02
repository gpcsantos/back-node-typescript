import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades'
import * as yup from 'yup';

import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}

interface ErrType {
  message: object;
  status?: number;
}

export const getByIdValidation = validation((getSchema) =>
({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
})
);

export const getById = async (req: Request<IParamProps>, res: Response, next: NextFunction) => {

  if (!req.params.id) {
    const err: ErrType = {
      message: {
        default: 'O paramento "id" precisa ser informado'
      },
      status: StatusCodes.BAD_REQUEST,
    }
    next(err);
    return;
  }

  const result = await CidadesProvider.getById(Number(req.params.id));

  if (result instanceof Error) {
    const err: ErrType = {
      message: {
        default: result.message
      },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    next(err);
    return;
  }

  res.status(StatusCodes.OK).json(result);
  return;
};