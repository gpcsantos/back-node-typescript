import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - UpdateById', () => {

  it('Altera um Registro por ID', async () => {

    const respostaCria = await testServer
      .post('/cidades')
      .send({
        nome: 'CidadeNome'
      });

    expect(respostaCria.statusCode).toEqual(StatusCodes.CREATED);

    const respostaConsulta = await testServer
      .put(`/cidades/${respostaCria.body}`)
      .send({
        nome: 'CidadeNovoNome'
      });

    expect(respostaConsulta.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Não pode alterar um registro que não existe', async () => {

    const resposta2 = await testServer
      .get('/cidades/99999')
      .send({
        nome: 'CidadeNome'
      });

    expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta2.body).toHaveProperty('errors.default');

  });

});

