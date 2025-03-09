# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v2#.13.1` while writing this doc)
- npm (I've used version `10.9.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

___

Made with ❤️ by [Walmyr](https://walmyr.dev).


Ótimo! 🎉 Agora seu backend e frontend foram finalizados corretamente!

Se quiser verificar se todas as portas estão realmente livres, rode no Git Bash ou no CMD:

bash
Copiar
Editar
netstat -ano | findstr :3000
netstat -ano | findstr :3001
Se nenhum resultado aparecer, significa que tudo foi finalizado com sucesso! 🚀

Agora, sempre que precisar iniciar o projeto novamente, basta rodar:

bash
Copiar
Editar
npm run start:server & npm run start:frontend & npx cypress open
