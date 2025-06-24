import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - GetAll', () => {

  it('Consulta todos os registro de Cidade', async () => {

    const respostaCria = await testServer
      .post('/cidades')
      .send({
        nome: 'CidadeNome'
      });

    expect(respostaCria.statusCode).toEqual(StatusCodes.CREATED);

    const respostaConsulta = await testServer
      .get('/cidades')
      .send();

    expect(Number(respostaConsulta.headers['x-total-count'])).toBeGreaterThan(0);
    expect(respostaConsulta.statusCode).toEqual(StatusCodes.OK);
    expect(respostaConsulta.body.length).toBeGreaterThan(0);

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

