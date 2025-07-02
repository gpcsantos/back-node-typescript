import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string
}
interface ErrType {
  message: object;
  status?: number;
}

export const getAllValidation = validation((getSchema) =>
({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
})
);

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response, next: NextFunction) => {

  let err: ErrType;
  const { id, page, limit, filter } = req.query;

  const result = await CidadesProvider.getAll(page || 1, limit || 7, filter || '', id)
  const count = await CidadesProvider.count(filter);

  if (result instanceof Error) {
    err = {
      message: { default: result.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    next(err);
    return;

  } else if (count instanceof Error) {
    err = {
      message: { default: count.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    next(err);
    return;
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  res.status(StatusCodes.OK).json(result);
};