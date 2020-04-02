const WebService = require('./web-service/WebService');

const porta = process.env.PORT || 3000;

debugger;

const webService = new WebService();
webService.ouvir(porta);

console.log(`Ouvindo na porta ${porta}`);