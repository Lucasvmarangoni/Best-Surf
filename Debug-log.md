# Debug Log

Após meu último projeto percebi que deveria ter documentado todos os problemas e erros que resolvi, pois as vezes eles se repetiam e eu percebia que não lembrava o que tinha feito antes.
Por isso decidi acrescentar a este projeto o arquivo de Debug-log e compartilha-lo no repositório.

<br>

# Log

## '__dirname' is not defined.eslintno-undef

eslint não reconhece a variável __dirname. A solução foi adicionar a variável __dirname como uma variável global no seu arquivo de configuração do eslint.

     "globals": {
    "__dirname": true
    }

<br>

## global.testRequest

Tive que alterar a versão do @types do node para a 14.

    "@types/node": "14.0.0",

Apaguei a pasta node_modules e instalei novamente.


## Module '"buffer"' has no exported member 'Blob'. nodejs

    https://copyprogramming.com/howto/module-buffer-has-no-exported-member-blob

Funcionou usar:

    "devDependencies": {
    "@types/node": "^14.18.10",
    "typescript": "^3.9.10"
    },

mas gerou outro erro, que foram mais de 1000 erros, causados pela alteração na versão do typescript.
Voltei para a versão mais atual e resolveu.
Porem o Jest continuou causando erro no momento de rodar os testes.

    import { resolve } from 'path';
    ^^^^^^
    SyntaxError: Cannot use import statement outside a module

E após eu alterar o jest da pasta root para igual ao da pasta test.

    import { pathsToModuleNameMapper } from 'ts-jest';
    ^^^^^^
    SyntaxError: Cannot use import statement outside a module

Acrescentei no package.json:

    "type": "module",

Porem não consegui usar a mesma configuração no jest.config.js da pasta test no da parta root, pois não encontrava o tsconfig.json. 

    https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/

Após resolver isso ocorreu o erro do jest não encontrar o modulo do module-alias.

    cannot find module '@src/clients/stormGlass' from 'src/clients/__test__/stormGlass.test.ts'

Teste usar a importação normal e funcionou: 

    import { StormGlass } from '../stormGlass';

Porem não é esse o resultado desejado, então alterei o "moduleNameMapper" do
jest.config.js root:

    moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },

Essa era a forma de representar normal, ensinada durante o curso. A anterior erá uma que ví nos comentário informando que de 2022 para frente o código tinha que mudar por que ao instalar o axios ele quebrava o jest.

- Usei essa configuração enquanto tentava corrigir os erros do '"buffer"'.