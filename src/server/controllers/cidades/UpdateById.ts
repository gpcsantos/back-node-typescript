import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CidadesProvider } from '../../database/providers/cidades';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models';

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'> { }

interface ErrType {
  message: object;
  status?: number;
}

export const updateByIdValidation = validation((getSchema) =>
({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
})
);

export const updateById = async (req: Request<IParamProps, {}, ICidade>, res: Response, next: NextFunction) => {

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

  const cidade: ICidade = {
    id: Number(req.params.id),
    nome: req.body.nome
  }
  const result = await CidadesProvider.updateById(cidade);

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

  res.status(StatusCodes.NO_CONTENT).send();
  return;
};