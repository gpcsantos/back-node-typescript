import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = 'body' | 'header' | 'params' | 'query';

// <T> Tipagem genérica, quem utilizar deverá informar a tipagem
type TGetSchema = <T>(schema: Schema<T>) => Schema<T>

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;


interface ErrType {
  message: Record<string, Record<string, string>>;
  status?: number;
}


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);

  const errorsResult: Record<string, Record<string, string>> = {}

  // Object.entries converte objetos em array permitindo iteração forEach
  Object.entries(schemas).forEach(([key, schema]) => {
    try {

      schema.validateSync(req[key as TProperty], { abortEarly: false });

    } catch (error) {

      const yupError = error as ValidationError;
      const errors: Record<string, string> = {}

      // monta a relação dos erros encontrados em "errors"
      yupError.inner.forEach(e => {
        if (e.path === undefined) return;
        errors[e.path] = e.message;
      })
      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    // monta um objeto de erro, com mensagem e status code
    // O NEXT garante que o erro chegará no  
    const err: ErrType = {
      message: errorsResult,
      status: StatusCodes.BAD_REQUEST,
    }
    return next(err);
  }


};
