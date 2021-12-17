# Performance React

* React Render:
  1. Cria uma nova versão do componente.
  2. Compara com a versão anterior.
  3. Se houver alteração, vai atualizar oque alterou.

* React memo:
  1. Pure Functional Components.
  2. Renders too often.
  3. Re-renders with same props.
  3. Medium to big size.

* useMemo:
  1. Memoriza um valor.
  2. Calculos pesados.
  3. Igualdade Referencial. Repassando para um componente filho.

* useCallback:
  1. Memoriza uma função e não seu retorno
  2. util quando passado de pai para filho ou em contextos

* Code Spliting (Dynamic Import)
  * Lazy laod -> so carrega quando é exibido em tela
  * So carrega o componente e seus codigos quando o componente aparece em tela
  * Também funciona para funções, Importando diretamente na função, com async await

* Virtualized
  * Exibe o html que está em tela

* Bundle analyzer
  * verificador de budle

### Comandos:

* cd Chapter-5/perf-react
* yarn dev / yarn server


### Testes:
Feito no ignews