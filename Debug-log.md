# Debug Log

Após meu último projeto percebi que deveria ter documentado todos os problemas e erros que resolvi, pois as vezes eles se repetiam e eu percebia que não lembrava o que tinha feito antes.
Por isso decidi acrescentar a este projeto o arquivo de Debug-log e compartilha-lo no repositório.

<br>

# Log

## '\_\_dirname' is not defined.eslintno-undef

eslint não reconhece a variável **dirname. A solução foi adicionar a variável **dirname como uma variável global no seu arquivo de configuração do eslint.

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

## 'err' é do tipo 'desconhecido'.ts(18046)

Durante as aulas do curso não foi necessário criar uma condicional, mas para mim apareceu essa mensagem de erro e o simples uso do any causava problema com o eslint, além de não ser uma boa prática uma vez que não é seguro porque não há garantia de que o que é lançado será herdado do Error.

Portanto usei a condicional com o instanceof:

    catch (err) {
        if (err instanceof Error) {
            throw new ClientRequestError(err.message);
        } else {
            throw new Error(String(err));
        }
        }

- https://stackoverflow.com/questions/68240884/error-object-inside-catch-is-of-type-unknown

- https://ruttmann.github.io/posts/ts-error-messages/

Nem uma dessas opções atendeu o projeto, então nos comentários tinha uma solução e o aviso do Waldemar dizendo que estava atualizado no repositório do curso. 

     catch (err) {           
      throw new ClientRequestError((err as { message: any }).message);
    }

Eu já havia pensando em usar o "as" antes, mas como nesse mesmo curso foi mencionado que não se usa "as" fora de testes, eu descartei a ideia. 

Contudo essa solução ainda faz uso do any, então mesmo sendo a solução do curso, não sei se é adequado.

Por isso decidi fazer assim: 

    throw new ClientRequestError((err as Error).message);

### O mesmo erro no tratamento do erro da response

- StormGlassResponseError

Solucionei assim:

     const error = err as AxiosError;
      if (error.response && error.response.status) {
        throw new StormGlassResponseError(
          `Error: ${JSON.stringify(error.response.data)} Code: ${
            error.response.status
          }`
        );
      }


## Erro com test:functional

    yarn test:functional
    yarn run v1.22.19
    warning ../../../package.json: No license field
    $ jest --projects ./test/functional --runInBand
    TypeError [ERR_IMPORT_ASSERTION_TYPE_MISSING]: Module "file:///home/ldragk/Documentos/Programa%C3%A7%C3%A3o/Best-Surfing/tsconfig.json" needs an import assertion of type "json"
        at new NodeError (node:internal/errors:393:5)
        at validateAssertions (node:internal/modules/esm/assert:82:15)
        at defaultLoad (node:internal/modules/esm/load:84:3)
        at nextLoad (node:internal/modules/esm/loader:163:28)
        at ESMLoader.load (node:internal/modules/esm/loader:605:26)
        at ESMLoader.moduleProvider (node:internal/modules/esm/loader:457:22)
        at new ModuleJob (node:internal/modules/esm/module_job:63:26)
        at #createModuleJob (node:internal/modules/esm/loader:480:17)
        at ESMLoader.getModuleJob (node:internal/modules/esm/loader:434:34)
        at async ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:78:21)
    error Command failed with exit code 1.

Resolvi assim: 

Usei a biblioteca "dotenv" para carregar as variáveis de ambiente necessárias para o teste. 

        "test:functional": "dotenv -e .env -- jest --projects ./test --runInBand",

Antes: 

        "test:functional": "jest --projects ./test/functional --runInBand",
