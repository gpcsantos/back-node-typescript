import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}
interface ICidade {
  nome: string;
}
interface ErrType {
  message: object;
  status?: number;
}

export const updateByIdValidation = validation((getSchema) =>
({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
})
);

export const updateById = async (req: Request<IParamProps, {}, ICidade>, res: Response, next: NextFunction) => {

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
  // console.log(req.body);
  // console.log(req.params);

  res.status(StatusCodes.NO_CONTENT).send();
  return;
};