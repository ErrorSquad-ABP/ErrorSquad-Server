# Repositório de arquivos Back-End
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
    <a href="#-status-do-projeto">
      <img src="https://img.shields.io/badge/📊_Status-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#%EF%B8%8F-tecnologias-previstas">
      <img src="https://img.shields.io/badge/🛠️_Tecnologias-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-instalação-e-execução">
      <img src="https://img.shields.io/badge/⚙️_Execução-4a90e2?style=for-the-badge"/>
    </a>
    &nbsp;
    <a href="#-nossa-equipe">
      <img src="https://img.shields.io/badge/👥_Equipe-4a90e2?style=for-the-badge"/>
    </a>
  </p>
</div>

<hr>

## 📝 Descrição

Backend do sistema de gestão de horários acadêmicos da FATEC Jacareí, desenvolvido pela equipe Error Squad. O projeto visa automatizar o processo de divulgação e consulta de horários de aulas, substituindo o sistema manual atual por uma solução digital integrada.

### Problema
A secretaria acadêmica necessita refazer manualmente os informes de horários a cada alteração, tornando o processo ineficiente e propenso a erros.

### Solução
Sistema web que permite:
- Consulta de horários por curso, ambiente, turno e turma
- Importação e gerenciamento de dados via CSV
- Validação automática de conflitos
- Geração de relatórios em PDF
- Consultas dinâmicas e filtradas

## 📅 Cronograma

- **18/03**: Kick-off e Definição da Equipe
- **24/03**: Início Sprint 1
- **15/04**: Review Sprint 1
- **16/04**: Início Sprint 2
- **15/05**: Review Sprint 2
- **16/05**: Início Sprint 3
- **10/06**: Review Sprint 3
- **11/06**: Apresentação Final

---

## 🎯 Requisitos

### Funcionais
- **RF01**: Ingestão de dados via arquivo CSV
- **RF02**: Gerenciamento CRUD dos dados (opcional)
- **RF03**: Validação de regras de alocação
  - Evitar conflitos de horários
  - Evitar conflitos de salas
- **RF04**: Exportação de relatórios em PDF
- **RF05**: Sistema de consultas dinâmicas

### Não Funcionais
- **RNF01**: Mapa interativo de salas
- **RNF02**: Interface responsiva

### Restrições
- Prototipação no Figma
- Backend em JavaScript
- Banco de dados PostgreSQL
- Documentação no GitHub
- Gerenciamento via Trello

---

## 📊 Status do Projeto

| Status | Fase                                  |
| ------ | ------------------------------------- |
| ✅     | Fase 1: Definição do Projeto e Equipe |
| ✅     | Fase 2: Planejamento e Design         |
| ✅     | Fase 3: Desenvolvimento               |
| ✅     | Fase 4: Testes e Validação            |
| ⏳     | Fase 5: Entrega e Apresentação        |

---

## 🛠️ Tecnologias

- **Backend**: JavaScript (Node.js)
- **Banco de Dados**: PostgreSQL
- **Controle de Versão**: Git/GitHub
- **Gestão**: GitHub Projects

### Ferramentas de Desenvolvimento
- **Git**: Controle de versão.
- **GitHub**: Repositório para colaboração e versionamento.
- **Figma**: Prototipação e validação do design.
- **Trello/GitHub Projects**: Gerenciamento de tarefas e sprints.

### Estrutura do Backend (Express.js)
- Roteamento com Express Router
- Middlewares personalizados para validação
- Gerenciamento de sessões com express-session
- Sistema de arquivos para manipulação de CSV
- Queries SQL nativas com node-postgres

---

## 📥 Instalação e Execução

### Pré-requisitos
- **Node.js**: [Download](https://nodejs.org/)
- **PostgreSQL**: [Download](https://www.postgresql.org/)

### Dependências principais
- **Express.js**: Framework web minimalista para Node.js
```json
{
  "dependencies": {
    "express": "^4.18.3"
  }
}
```

### Passos para execução
```bash
# Clone o repositório
git clone https://github.com/ErrorSquad-ABP/ErrorSquad-Server.git

# Entre na pasta do projeto
cd ErrorSquad-Server

# Instale as dependências
npm install express

# Configure o banco de dados no arquivo .env
# Exemplo do arquivo .env:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_NAME=nome_do_banco

# Inicie o servidor
npm start
```

---

## 🚀 Funcionalidades do Backend

1. **Ingestão de Dados**:
   - Importação de horários e alocações a partir de arquivos CSV.
   - Validação automática para evitar conflitos de horários e ambientes.

2. **Gerenciamento de Dados (CRUD)**:
   - Operações de criação, leitura, atualização e exclusão de horários, professores, turmas e ambientes.

3. **Consultas Dinâmicas**:
   - Filtros por turma, turno, professor, ambiente e data.

4. **Geração de Relatórios**:
   - Exportação de relatórios em formato PDF com os horários e alocações.

5. **Validação de Regras**:
   - Garantia de que duas turmas não sejam alocadas no mesmo ambiente ao mesmo tempo.
   - Verificação de conflitos de horários para professores.

---

## 🎯 Requisitos do Backend

### Requisitos Funcionais
- **RF01**: Sistema de ingestão de dados via CSV
  - Parsing e validação automática de arquivos CSV
  - Mapeamento de dados para o modelo do banco
  - Tratamento de erros e inconsistências

- **RF02**: API para gerenciamento CRUD
  - Endpoints para gestão de horários
  - Autenticação para secretaria/coordenação
  - Validação de dados em tempo real

- **RF03**: Sistema de validação de regras
  - Verificação de conflitos de sala
  - Verificação de conflitos de horários de professores
  - Validação de capacidade dos ambientes

- **RF04**: Geração de relatórios PDF
  - Templates personalizáveis
  - Formatação automática de dados
  - Diferentes layouts por tipo de consulta

- **RF05**: API de consultas
  - Filtros por turma/turno/professor/data
  - Paginação e ordenação de resultados
  - Cache para otimização de performance

### Requisitos Não Funcionais
- Performance otimizada para consultas simultâneas
- Documentação completa da API (Swagger/OpenAPI)
- Logs detalhados para monitoramento
- Testes automatizados (unitários e integração)

---

## ⚙️ Arquitetura Backend

```plaintext
src/
├── api/           # Endpoints da API
│   ├── routes/    # Rotas da aplicação
│   └── handlers/  # Manipuladores de requisições
├── database/      # Conexão e queries do PostgreSQL
├── models/        # Modelos de dados
├── services/      # Lógica de negócios
├── utils/         # Funções utilitárias
└── config/        # Configurações do sistema
```

### Estrutura do Backend (Vanilla JS)
- Roteamento manual de requisições HTTP
- Implementação própria de middlewares
- Gerenciamento de sessões sem frameworks
- Validações customizadas
- Queries SQL nativas ou com driver básico

---

## 👥 Nossa Equipe

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

---

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

---

## 📜 Licença

<div align="center">
    <a href="https://github.com/ErrorSquad-ABP/ErrorSquadABP/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/📄_Licença-MIT-4a90e2?style=for-the-badge"/>
    </a>
</div>

<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=4a90e2&height=100&section=footer" width="100%"/>
</div>

