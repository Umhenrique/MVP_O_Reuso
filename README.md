# 🧠 Codinome O - Sistema de Reúso de Requisitos Baseado em Ontologias

> **MVP (Produto Mínimo Viável)** de uma plataforma web baseada em engenharia de ontologias para auxílio na identificação, recomendação, rastreabilidade e reúso sistemático de requisitos de software.

---

## 👨‍💻 Equipe do Projeto

- **Matheus Medeiros**
- **Pedro Guilherme**
- **Luiz Souza**

---

## 🎯 Apresentação e Objetivos

No desenvolvimento de software corporativo, identificar requisitos semelhantes produzidos em projetos anteriores pode ser uma atividade demorada e custosa. A análise manual de repositórios e documentações legadas dificulta a padronização e causa retrabalho.

O **Codinome O** resolve este problema através de uma **base ontológica de conhecimento**:
- O engenheiro de software informa ou seleciona as **características contextuais** do novo projeto (Domínio de negócio, padrão arquitetural, linguagens/frameworks, exigências de segurança/conformidade e atributos de qualidade).
- O **Motor de Ontologia** consulta o grafo de conhecimento, realiza a inferência de relações e calcula a porcentagem de **relevância/similaridade ontológica** de cada requisito existente.
- O sistema apresenta as sugestões ordenadas com **justificativa semântica**, **rastreabilidade da origem** (link para GitHub/Jira/Docs) e permite a **avaliação e exportação** da nova especificação de requisitos.

---

## 📋 Funcionalidades e Casos de Uso (UC01 - UC06)

| Caso de Uso | Nome | Descrição & Requisitos Cobertos |
| :--- | :--- | :--- |
| **UC01** | **Cadastrar Projeto** | Permite o registro de projetos existentes na ontologia associando domínio, arquitetura, tecnologias e caminho/repositório de origem (*RF01, RNF08*). |
| **UC02** | **Cadastrar Requisito** | Permite registrar requisitos reutilizáveis com identificador único, título, descrição detalhada, critérios de aceitação e vinculação ontológica (*RF02, RF03, RF09, RF12, RF13*). |
| **UC03** | **Buscar Requisitos Reutilizáveis** | Permite selecionar características contextuais e consultar o motor ontológico para receber sugestões (*RU01-RU03, RF04-RF07*). |
| **UC04** | **Filtrar Sugestões** | Permite filtrar sugestões por tipo (Funcional vs Não-Funcional), faixa de relevância ou busca textual (*RF14*). |
| **UC05** | **Visualizar Detalhes e Origem** | Exibe a especificação completa, critérios de aceite, link/caminho da origem e a justificativa da relação ontológica (*RU04, RU05, RU07, RF08, RF09, RF10, RF11*). |
| **UC06** | **Avaliar Requisito para Reúso** | Permite ao engenheiro aceitar ou rejeitar sugestões e exportar a especificação de requisitos consolidada em formato Markdown (*RU06*). |
| **Grafo** | **Navegador da Ontologia** | Visualizador de nós e conexões relacionais entre taxonomias, instâncias de projetos e requisitos. |

---

## ⚙️ Tecnologias Utilizadas

- **Core & UI Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism & Dark Mode)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Motor Ontológico**: Motor em JS puro com algoritmo de sobreposição semântica, inferência direta/indireta e sincronização com `localStorage`.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js v18 ou superior
- NPM ou Yarn

### Passos

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação no navegador:**
   Abra [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```text
QR/
├── public/
├── src/
│   ├── components/
│   │   ├── BuscarRequisitos.jsx      # UC03, UC04, UC05, UC06
│   │   ├── CadastrarProjeto.jsx      # UC01
│   │   ├── CadastrarRequisito.jsx    # UC02
│   │   ├── Header.jsx                 # Topbar e Seletor de Perfis (Engenheiro / Admin)
│   │   ├── OntologyGraphView.jsx     # Visualizador interativo do grafo ontológico
│   │   └── RequisitoDetailModal.jsx  # Modal de detalhes, rastreabilidade e justificativa (UC05)
│   ├── services/
│   │   ├── mockData.js               # Taxonomias ontológicas e dataset inicial pré-carregado
│   │   └── ontologyEngine.js         # Algoritmo de matching semântico, scoring e persistência
│   ├── App.jsx                       # Layout principal e navegação
│   ├── index.css                     # Estilos utilitários e efeitos glassmorphism
│   └── main.jsx                      # Ponto de entrada React
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📝 Licença

Este projeto é um protótipo acadêmico/MVP desenvolvido para a disciplina de Engenharia de Requisitos / Reúso de Software.
