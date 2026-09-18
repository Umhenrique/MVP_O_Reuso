# Codinome O - Sistema de Reúso de Requisitos Baseado em Ontologias

MVP (Produto Mínimo Viável) de uma aplicação web para auxílio na identificação, recomendação, rastreabilidade e reúso sistemático de requisitos de software utilizando ontologias.

## Equipe do Projeto

- Matheus Medeiros
- Pedro Guilherme
- Luiz Souza

## Descrição do Sistema

O sistema utiliza uma base ontológica de conhecimento para relacionar características de projetos (domínio, padrão arquitetural, tecnologias, conformidade e atributos de qualidade) com requisitos de software previamente cadastrados.

A partir das características informadas pelo engenheiro de software, o motor ontológico realiza a consulta e apresenta sugestões de requisitos ordenados por nível de relevância, acompanhados de justificativa semântica, rastreabilidade da origem e opção de exportação em Markdown.

## Casos de Uso Implementados

- **UC01 - Cadastrar Projeto**: Cadastro de projetos e suas características na ontologia.
- **UC02 - Cadastrar Requisito**: Cadastro de requisitos reutilizáveis com identificador, descrição, link de origem e tags ontológicas.
- **UC03 - Buscar Requisitos Reutilizáveis**: Seleção de características do projeto e consulta à ontologia.
- **UC04 - Filtrar Sugestões**: Filtragem por tipo (Funcional/RNF), relevância ou busca textual.
- **UC05 - Visualizar Detalhes e Origem**: Exibição da especificação completa, origem original e justificativa ontológica.
- **UC06 - Avaliar Requisito para Reúso**: Avaliação (Aceitar/Rejeitar) e exportação consolidada em Markdown.
- **Grafo Ontológico**: Visualização relacional dos nós e conexões da ontologia.

## Tecnologias Utilizadas

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
- **Lógica Ontológica**: Motor de inferência em JavaScript puro com persistência em LocalStorage

## Como Executar

### Instalação

```bash
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

Acesse a aplicação em `http://localhost:3000`.
