import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";



export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {

  try {

    const result = await Knex(ETableNames.cidade)
      .select('id', 'nome')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
    // console.log('Provider Cidades - getAll: ', result);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select('id', 'name')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById]
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar todos os registros');
  }

}
