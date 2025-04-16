# Repositório de Backend - Interface Web de Horários Acadêmicos
<div align="center">
  <h1>
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&duration=3000&pause=1000&color=4A90E2&center=true&vCenter=true&repeat=true&width=1000&lines=Interface+Web+de+Hor%C3%A1rios+Acad%C3%AAmicos+%7C+Backend+%F0%9F%92%BB" alt="Typing SVG" />

  <div align="center">
    <a href="https://www.cps.sp.gov.br/">
      <img src="https://github.com/ErrorSquad-ABP/ErrorSquad-Assets1/blob/main/Images/CPS-removebg-preview.png" height="90" alt="Logo CPS"/>
    </a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://fatecjacarei.cps.sp.gov.br/">
      <img src="https://github.com/ErrorSquad-ABP/ErrorSquad-Assets1/blob/main/Images/Fatec-removebg-preview.png" height="90" alt="Logo Fatec"/>
    </a>
  </div>
  
  <br>
  
  <div>
    <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-4a90e2?style=for-the-badge&logo=clockify&logoColor=1A1B27"/>
  </div>

  <br>
  
  <div>
    <img src="https://img.shields.io/badge/Backend-Operacional-success?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/Sprint_1-Concluída-success?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/API-Funcional-success?style=for-the-badge"/>
  </div>

  <p align="center">
    <a href="#-descrição">
      <img src="https://img.shields.io/badge/📝_Descrição-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-arquitetura">
      <img src="https://img.shields.io/badge/🏗️_Arquitetura-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-tecnologias">
      <img src="https://img.shields.io/badge/🛠️_Tecnologias-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-instalação-e-execução">
      <img src="https://img.shields.io/badge/⚙️_Execução-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-equipe">
      <img src="https://img.shields.io/badge/👥_Equipe-4a90e2?style=for-the-badge"/>
    </a>
  </p>
</div>

<hr>

## 📝 Descrição

**ErrorSquad-Server** é o componente backend do sistema de gestão de horários acadêmicos da FATEC Jacareí, desenvolvido pela equipe Error Squad como parte do projeto de Aprendizagem Baseada em Projetos (ABP) do 1º semestre de 2025.

### Problema Identificado
A secretaria acadêmica da FATEC Jacareí enfrenta desafios significativos na gestão e divulgação dos horários de aulas:
- Processo manual de criação e atualização de informes de horários
- Retrabalho constante a cada alteração de cronograma
- Dificuldade de consulta por parte de alunos e professores
- Potencial para conflitos de alocação de ambientes e docentes
- Ausência de um sistema centralizado para gerenciamento de dados

### Solução Implementada
O backend fornece uma API REST completa que viabiliza:
- **Consulta avançada**: Filtros por curso, ambiente, turno, turma, professor e período
- **Importação automatizada**: Ingestão e processamento de dados via CSV
- **Validação inteligente**: Detecção automática de conflitos de horários e ambientes
- **Persistência robusta**: Armazenamento seguro em banco de dados PostgreSQL
- **Análise de dados**: Integração com Google BigQuery para relatórios avançados
- **Geração de documentos**: Exportação de relatórios em PDF com formatação profissional
- **Gestão completa**: CRUD para todas as entidades do sistema (cursos, disciplinas, professores, etc.)

## 🏗️ Arquitetura

O backend foi desenvolvido seguindo princípios de arquitetura limpa e modular, com clara separação de responsabilidades:

### 📁 Estrutura de Diretórios

```
ErrorSquad-Server/
├── src/                      # Código-fonte principal
│   ├── server.js             # Ponto de entrada da aplicação
│   ├── config/               # Configurações do sistema
│   ├── controllers/          # Controladores da API (lógica de negócio)
│   │   ├── ambienteController.js
│   │   ├── cursoController.js
│   │   ├── diaController.js
│   │   ├── disciplinaController.js
│   │   ├── docenteController.js
│   │   ├── healthController.js
│   │   ├── horarioController.js
│   │   ├── periodoController.js
│   │   ├── semestreController.js
│   │   └── turnoController.js
│   ├── database/             # Camada de acesso a dados
│   │   ├── entity/           # Modelos de dados e DTOs
│   │   └── migrations/       # Scripts de migração e queries SQL
│   ├── lib/                  # Bibliotecas e integrações externas
│   │   └── bigquery.js       # Integração com Google BigQuery
│   ├── routes/               # Definição de rotas da API
│   │   ├── ambienteRoutes.js
│   │   ├── cursoRoutes.js
│   │   ├── diaRoutes.js
│   │   ├── disciplinaRoutes.js
│   │   ├── docenteRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── horarioRoutes.js
│   │   ├── index.js          # Agregador de rotas
│   │   ├── periodoRoutes.js
│   │   ├── semestreRoutes.js
│   │   ├── turnoRoutes.js
│   │   └── userRoutes.js
│   ├── services/             # Serviços e lógica de negócios complexa
│   └── utils/                # Funções utilitárias
│       ├── firstLetterUppercase.js
│       ├── isValidTime.js
│       └── utilsExample.js
├── package.json              # Dependências e scripts
└── README.md                 # Esta documentação
```

### 📊 Diagrama de Componentes

A arquitetura segue um padrão em camadas com fluxo de dados bem definido:

1. **Camada de Rotas** (`routes/`) - Define endpoints RESTful e parâmetros aceitos
2. **Camada de Controladores** (`controllers/`) - Implementa lógica de negócios e validações
3. **Camada de Serviços** (`services/`) - Encapsula operações complexas e integrações
4. **Camada de Acesso a Dados** (`database/`) - Gerencia conexões e operações no banco de dados
5. **Camada de Utilidades** (`utils/` e `lib/`) - Provê funções auxiliares e integrações externas

### 🔄 Fluxo de Requisições

```
Cliente → Requisição HTTP → Rota → Controller → Serviço → Banco de Dados → Resposta
```

### 📝 Padrões Arquiteturais

- **RESTful API**: Endpoints seguem convenções REST para recursos e operações CRUD
- **Middleware Pattern**: Processamento em cadeia para autenticação, validação e logging
- **Repository Pattern**: Abstração das operações de banco de dados
- **DTO Pattern**: Transferência segura de dados entre camadas
- **Factory Pattern**: Criação padronizada de objetos complexos

## 🛠️ Tecnologias

### Stack Principal

- **Node.js**: Ambiente de execução JavaScript server-side
- **Express.js**: Framework web para construção de APIs
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional
- **Google BigQuery**: Datawarehouse para análises e relatórios avançados

### Bibliotecas e Ferramentas

| Dependência | Versão | Finalidade |
|-------------|--------|------------|
| **express** | ^4.21.2 | Framework web rápido e minimalista |
| **dotenv** | ^16.4.7 | Carregamento de variáveis de ambiente |
| **pg** | ^8.14.1 | Cliente PostgreSQL para Node.js |
| **@google-cloud/bigquery** | ^7.9.3 | SDK para integração com Google BigQuery |
| **cors** | ^2.8.5 | Middleware para habilitar CORS |
| **nodemon** | ^3.0.1 | Reinicialização automática do servidor durante desenvolvimento |

### Paradigmas e Práticas

- **Programação Assíncrona**: Uso extensivo de Promises e async/await
- **Modularização**: Componentes com responsabilidade única e coesos
- **Validação Robusta**: Checagem rigorosa de inputs e parâmetros
- **Tratamento de Erros**: Sistema padronizado de captura e resposta de exceções
- **Logs Estruturados**: Registro de eventos e erros para monitoramento e debug

## 📦 Dependências e Ambiente

Para executar este projeto, você precisará das seguintes tecnologias instaladas:

### Pré-requisitos

- **Node.js**: v16.x ou superior [Download](https://nodejs.org/)
- **PostgreSQL**: v14.x ou superior [Download](https://www.postgresql.org/)
- **Git**: Para clonar o repositório [Download](https://git-scm.com/)

### Variáveis de Ambiente

O projeto utiliza o arquivo `.env` para configurações sensíveis. Crie este arquivo na raiz do projeto com as seguintes variáveis:

```
# Servidor
PORT=3000
NODE_ENV=development

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco

# Google BigQuery (opcional)
GOOGLE_APPLICATION_CREDENTIALS=./src/config/bigquery-key.json
BIGQUERY_PROJECT_ID=seu_projeto_id
BIGQUERY_DATASET=seu_dataset
```

> ⚠️ **IMPORTANTE**: Nunca compartilhe seu arquivo `.env` ou credenciais em repositórios públicos.

## ⚙️ Instalação e Execução

Siga estas etapas para configurar e executar o backend em seu ambiente local:

```bash
# Clone o repositório
git clone https://github.com/ErrorSquad-ABP/ErrorSquad-Server.git

# Navegue até o diretório do projeto
cd ErrorSquad-Server

# Instale todas as dependências
npm install

# Configure o arquivo .env conforme instruções acima

# Execute o servidor em modo desenvolvimento
npm run dev

# Ou em modo produção
npm start
```

### Verificação de Funcionamento

Após iniciar o servidor, acesse:
- `http://localhost:3000/health` - Deve retornar status 200 e mensagem "OK"
- `http://localhost:3000/api/cursos` - Deve listar os cursos cadastrados (se houver)

## 🚀 Funcionalidades Implementadas

### 1. Endpoints da API (CRUD Completo)

| Recurso | Método | Endpoint | Descrição |
|---------|--------|----------|-----------|
| **Ambientes** | GET | `/api/ambientes` | Listar todos os ambientes |
|  | GET | `/api/ambientes/:id` | Obter um ambiente específico |
|  | POST | `/api/ambientes` | Criar novo ambiente |
|  | PUT | `/api/ambientes/:id` | Atualizar ambiente existente |
|  | DELETE | `/api/ambientes/:id` | Remover um ambiente |
| **Cursos** | GET | `/api/cursos` | Listar todos os cursos |
|  | GET | `/api/cursos/:id` | Obter um curso específico |
|  | POST | `/api/cursos` | Criar novo curso |
|  | PUT | `/api/cursos/:id` | Atualizar curso existente |
|  | DELETE | `/api/cursos/:id` | Remover um curso |
| **Docentes** | GET | `/api/docentes` | Listar todos os docentes |
|  | GET | `/api/docentes/:id` | Obter um docente específico |
|  | POST | `/api/docentes` | Criar novo docente |
|  | PUT | `/api/docentes/:id` | Atualizar docente existente |
|  | DELETE | `/api/docentes/:id` | Remover um docente |
| **Horários** | GET | `/api/horarios` | Listar todos os horários |
|  | GET | `/api/horarios/filtro` | Buscar horários com filtros |
|  | POST | `/api/horarios` | Criar novo horário |
|  | PUT | `/api/horarios/:id` | Atualizar horário existente |
|  | DELETE | `/api/horarios/:id` | Remover um horário |
| **Sistema** | GET | `/health` | Verificar status do servidor |

> Para documentação completa de todos os endpoints, consulte a [Documentação do Projeto](https://github.com/ErrorSquad-ABP/Documentacao-ABP)

### 2. Sistemas de Validação

O backend implementa diversas validações para garantir a integridade dos dados:

- **Validação de campos obrigatórios**: Verificação de presença e formato
- **Regras de negócio**: Implementações específicas do domínio acadêmico
- **Prevenção de conflitos**: Algoritmos para detectar sobreposições de horários
- **Consistência referencial**: Verificação de entidades relacionadas

### 3. Integração com Banco de Dados

- **PostgreSQL**: Persistência principal com transações ACID
- **BigQuery**: Consultas analíticas e relatórios complexos
- **Migrations**: Scripts para evolução controlada do schema

### 4. Segurança

- **Validação de input**: Proteção contra injeção SQL e outros ataques
- **CORS configurável**: Controle de acesso por origem
- **Sanitização de dados**: Limpeza de entradas potencialmente perigosas
- **Mensagens de erro seguras**: Sem vazamento de informações sensíveis

## 📏 Padrões de Código

O projeto segue convenções rigorosas para manter a qualidade e consistência do código:

- **Nomenclatura**: camelCase para variáveis, funções e arquivos
- **Formatação**: Indentação de 2 espaços, sem tabs
- **Comentários**: Documentação de funções complexas e decisões arquiteturais
- **Tratamento de Erros**: Try/catch em operações críticas e assíncronas
- **Async/Await**: Preferência sobre callbacks e Promises encadeadas

## 📊 Status do Projeto

| Status | Fase | Detalhes |
|--------|------|----------|
| ✅ | Definição do Projeto | Requisitos e escopo definidos |
| ✅ | Planejamento | Arquitetura e tecnologias escolhidas |
| ✅ | Desenvolvimento Básico | CRUD completo implementado |
| ✅ | Testes Unitários | Principais controladores testados |
| ⏳ | Integração | Conexão com frontend em andamento |
| ⏳ | Validação Final | Testes de aceitação pendentes |
| ⏳ | Entrega | Documentação em finalização |

## 🔄 Integração com Outros Sistemas

O backend foi projetado para integrar-se perfeitamente com:

- **Frontend**: Consumo da API pelo [ErrorSquad-Front](https://github.com/ErrorSquad-ABP/ErrorSquad-Front)
- **Documentação**: Mapeamento de requisitos da [Documentacao-ABP](https://github.com/ErrorSquad-ABP/Documentacao-ABP)
- **Recursos Visuais**: Acesso a imagens de [ErrorSquad-Assets1](https://github.com/ErrorSquad-ABP/ErrorSquad-Assets1)

## 👥 Equipe

<div align="center">
    <table>
        <tr>
            <td align="center"><b>Gestão</b></td>
            <td align="center"><b>Desenvolvimento</b></td>
        </tr>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Tiago Jardel Costa</b><br>
                            <i>Product Owner</i><br>
                            <a href="https://github.com/Tiago199516">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/tiago-jardel-da-costa-0b595bba/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Arthur Facchinetti Peixoto</b><br>
                            <i>Scrum Master</i><br>
                            <a href="https://github.com/ArthurFacchinetti">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-facchinetti-peixoto/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>João Victor Lopes Rosa</b><br>
                            <a href="https://github.com/JV-L0pes">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/arthur-facchinetti-peixoto/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Alícia Silva Dias</b><br>
                            <a href="https://github.com/TIALICIA">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/alícia-silva-dias/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Leonardo da Silva Irineu</b><br>
                            <a href="https://github.com/Leo-Slv">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/leonardo-irineu-8418b0288/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Felipe Ferreira Pacheco</b><br>
                            <a href="https://github.com/FelipePacheco30">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/felipe-ferreira-pacheco-621443347/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <b>Carlos Eduardo Espirito Santo</b><br>
                            <a href="https://github.com/PromptdComando">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/carlos-eduardo-espirito-santo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                        <td align="center">
                            <b>Caio Araujo</b><br>
                            <a href="https://github.com/Caiuuutecnologico">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/caio-arauj/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 👨‍🏫 Coordenação e Orientação

<div align="center">
    <table>
        <tr>
            <td align="center"><b>Professor</b></td>
        </tr>
        <tr>
            <td align="center">
                <table>
                    <tr>
                        <td align="center">
                            <b>Prof. Marcelo Sudo</b><br>
                            <i>Focal Point</i><br>
                            <a href="https://github.com/marcelosudo">
                                <img src="https://img.shields.io/badge/GitHub-333?style=flat-square&logo=github"/>
                            </a>
                            <a href="https://www.linkedin.com/in/marcelo-sudo/">
                                <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white"/>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

## 📜 Licença

<div align="center">
    <a href="https://github.com/ErrorSquad-ABP/ErrorSquadABP/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/📄_Licença-MIT-4a90e2?style=for-the-badge"/>
    </a>
</div>

<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=4a90e2&height=100&section=footer" width="100%"/>
</div>

