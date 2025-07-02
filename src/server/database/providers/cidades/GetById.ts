import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {

  try {

    const result = await Knex(ETableNames.cidade)
      .select('id', 'nome')
      .where('id', '=', id)
      .first();
    console.log('Provider Cidades - getById: ', result);

    if (result === undefined) {
      return new Error('Erro ao consultar po ID');
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar po ID');
  }

}
