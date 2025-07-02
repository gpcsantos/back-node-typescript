import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";


export const updateById = async (cidade: ICidade): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.cidade)
      .where('id', '=', cidade.id)
      .update('nome', cidade.nome) as number;
    // console.log('Providers Cidade - UPDATE: ', result)

    return;


    // return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar o registro');
  }

}
