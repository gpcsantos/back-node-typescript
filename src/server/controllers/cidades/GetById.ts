import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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

  if (Number(req.params.id) === 99999) {
    const err: ErrType = {
      message: {
        default: 'Registro não encontrado'
      },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    next(err);
    return;
  }

  res.status(StatusCodes.OK).json(
    {
      id: req.params.id,
      nome: 'NomeCidade',
    }
  );
  return;
};