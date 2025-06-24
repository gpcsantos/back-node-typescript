import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - Delete', () => {

  it('Apaga Registro', async () => {

    const respostaCria = await testServer
      .post('/cidades')
      .send({
        nome: 'CidadeNome'
      });

    expect(respostaCria.statusCode).toEqual(StatusCodes.CREATED);

    const respostaApaga = await testServer
      .delete(`/cidades/${respostaCria.body}`)
      .send();

    expect(respostaApaga.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Não pode apagar registro que não existe', async () => {

    const resposta2 = await testServer
      .delete('/cidades/99999')
      .send();

    expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta2.body).toHaveProperty('errors.default');

  });

});

