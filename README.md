# labo-ngapp-servicenow

Laboratório pessoal para experimentar as APIs ServiceNow à partir de uma aplicação Angular.


### Instruções

A aplicação é uma SPA Angular, utilise os comandos comuns `npm` para instalar suas dependências e lançar o ambiente de desenvolvimento:

```shell
npm install
npm start
```


Os parâmetros de configuração para conexão com sua instância ServiceNow são definidos no arquivo `src/assets/config.dev.json`, crie um novo arquivo segundo o exemplo abaixo:

```json
{
    "serviceNow": {
        "requireAuth": true,
        "instanceUrl": "https://xxxxxx.service-now.com",
        "clientId": "MY_OAUTH_CLIENT_ID",
        "apiNamespace": "/api/nome_api_custom"
    }
}
```

É preciso configurar o acesso CORS de sua instância, habilitando acesso à partir de `localhost` para testes em desenvolvimento.

