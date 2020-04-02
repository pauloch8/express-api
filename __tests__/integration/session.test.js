const request = require('supertest');
const WebService = require('../../src/web-service/WebService');
const webService = new WebService;

describe('Session', () => {

    it('deve autenticar com credenciais validas', async () => {
        const response = await request(webService.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "teste"
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it('não deve autenticar com usuário invalido', async () => {
        const response = await request(webService.express)
            .post("/sessions")
            .send({
                usuario: "testeInválido",
                senha: "teste"
            });
        expect(response.status).toBe(401);
    });

    it('não deve autenticar com senha invalida', async () => {
        const response = await request(webService.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "testeInválido"
            });
        expect(response.status).toBe(401);
    });

    it('deve acessar rotas privadas quando autenticado', async() => {
        const resAutenticacao = await request(webService.express)
            .post("/sessions")
            .send({
                usuario: "teste",
                senha: "teste"
            });

        const resRotaPrivada = await request(webService.express)
            .get("/painel")
            .set('Authorization', `Bearer ${resAutenticacao.body.token}`);

        expect(resRotaPrivada.status).toBe(200);
    });

    it('não deve acessar rotas privadas sem informar jwt token', async() => {

        const resRotaPrivada = await request(webService.express)
            .get("/painel");

        expect(resRotaPrivada.status).toBe(401);
    });

    it('não deve acessar rotas privadas informando um jwt token inválido', async() => {

        const resRotaPrivada = await request(webService.express)
            .get("/painel")
            .set('Authorization', `Bearer 123456`);

        expect(resRotaPrivada.status).toBe(401);
    });

});