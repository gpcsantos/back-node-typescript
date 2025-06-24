import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - GetById', () => {

  it('Consulta Registro por ID', async () => {

    const respostaCria = await testServer
      .post('/cidades')
      .send({
        nome: 'CidadeNome'
      });

    expect(respostaCria.statusCode).toEqual(StatusCodes.CREATED);

    const respostaConsulta = await testServer
      .get(`/cidades/${respostaCria.body}`)
      .send();

    expect(respostaConsulta.statusCode).toEqual(StatusCodes.OK);
    expect(respostaConsulta.body).toHaveProperty('nome');

  });

  it('Não pode localizar um registro que não existe', async () => {

    const resposta2 = await testServer
      .get('/cidades/99999')
      .send();

    expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta2.body).toHaveProperty('errors.default');

  });

});

