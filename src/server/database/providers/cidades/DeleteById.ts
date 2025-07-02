import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {

  try {

    const result = await Knex(ETableNames.cidade).delete().where('id', '=', id);
    // console.log('Provider Cidades - DELETE', result);

    if (result === 0) {
      return new Error('Erro ao apagar o registro por ID');
    }

    return;

  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro por ID');
  }

}
