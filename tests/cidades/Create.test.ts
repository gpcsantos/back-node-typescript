import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - Create', () => {

  it('Cria Registro', async () => {

    const resposta1 = await testServer
      .post('/cidades')
      .send({
        nome: 'CidadeNome'
      });

    expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resposta1.body).toEqual('number');

  });

  it('Não pode criar uma cidade com nome muito curto', async () => {

    const resposta1 = await testServer
      .post('/cidades')
      .send({
        nome: 'Ci'
      });

    expect(resposta1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resposta1.body).toHaveProperty('errors.body.nome');

  });

});

